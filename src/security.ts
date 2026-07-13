import { SignJWT, jwtVerify } from 'jose';

const NONCE_TTL = 300; // 5 minutes in seconds

export interface UserPayload {
    id: number;
    role: string;
    email: string;
}

export class Security {
    private env: any;
    private secret: Uint8Array;

    constructor(env: any) {
        this.env = env;
        let secretStr = String(env.JWT_SECRET || '');
        if (!secretStr || secretStr.length < 32) {
            throw new Error('FATAL: JWT_SECRET is missing or too short (min 32 chars). Configure a proper secret via `wrangler secret put JWT_SECRET` to enable authentication.');
        }
        this.secret = new TextEncoder().encode(secretStr);
    }

    async generateToken(user: UserPayload): Promise<{ token: string; jti: string; expiresAt: number }> {
        const jti = crypto.randomUUID();
        const expiresAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
        const token = await new SignJWT({ ...user })
            .setProtectedHeader({ alg: 'HS256' })
            .setJti(jti)
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(this.secret);
        return { token, jti, expiresAt };
    }

    async verifyToken(token: string): Promise<UserPayload | null> {
        try {
            const { payload } = await jwtVerify(token, this.secret);
            const id = (payload as any)?.id;
            const role = (payload as any)?.role;
            const email = (payload as any)?.email;
            const jti = (payload as any)?.jti;
            if (typeof id !== 'number' || !Number.isFinite(id)) return null;
            if (typeof role !== 'string' || !role) return null;
            if (typeof email !== 'string' || !email) return null;
            if (typeof jti !== 'string' || !jti) return null;

            const session = await this.env.cfwforum_db
                .prepare('SELECT user_id, expires_at FROM sessions WHERE jti = ?')
                .bind(jti)
                .first();
            if (!session) return null;
            if (Number(session.user_id) !== id) return null;
            if (Number(session.expires_at) <= Math.floor(Date.now() / 1000)) return null;

            // 封禁用户拦截：即使 session 存在也拒绝访问（防御性检查）
            const userStatus = await this.env.cfwforum_db
                .prepare('SELECT status FROM users WHERE id = ?')
                .bind(id)
                .first<{ status: string }>();
            if (userStatus && userStatus.status === 'banned') return null;

            if (Math.random() < 0.01) {
                await this.env.cfwforum_db.prepare('DELETE FROM sessions WHERE expires_at < ?').bind(Math.floor(Date.now() / 1000)).run();
            }

            return { id, role, email };
        } catch (e) {
            return null;
        }
    }

    async validateRequest(request: Request): Promise<{ valid: boolean; error?: string }> {
        const timestamp = request.headers.get('X-Timestamp');
        const nonce = request.headers.get('X-Nonce');

        if (!timestamp || !nonce) {
            if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
                 return { valid: false, error: 'Missing security headers' };
            }
            return { valid: true };
        }

        const now = Math.floor(Date.now() / 1000);
        const ts = parseInt(timestamp, 10);

        if (Math.abs(now - ts) > NONCE_TTL) {
            return { valid: false, error: 'Request expired' };
        }

        const existing = await this.env.cfwforum_db.prepare('SELECT nonce FROM nonces WHERE nonce = ?').bind(nonce).first();
        if (existing) {
            return { valid: false, error: 'Replay detected' };
        }

        await this.env.cfwforum_db.prepare('INSERT INTO nonces (nonce, expires_at) VALUES (?, ?)').bind(nonce, ts + NONCE_TTL).run();

        if (Math.random() < 0.01) {
             await this.env.cfwforum_db.prepare('DELETE FROM nonces WHERE expires_at < ?').bind(now).run();
        }

        return { valid: true };
    }

    async logAudit(userId: number | null, action: string, resourceType: string, resourceId: string, details: any, request: Request) {
        const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
        await this.env.cfwforum_db.prepare(
            'INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(userId, action, resourceType, resourceId, JSON.stringify(details), ip).run();
    }
}
