const DEFAULT_FROM_NAME = '论坛管理员';

// Timeout helper
function withTimeout<T>(promise: Promise<T>, ms: number, errorMsg: string): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error(errorMsg)), ms)
        )
    ]);
}

// Helper to check MX records via DNS-over-HTTPS (Cloudflare DNS)
async function checkMX(email: string): Promise<boolean> {
    const domain = email.split('@')[1];
    if (!domain) return false;

    try {
        console.log(`[MX Check] Checking MX records for ${domain}...`);
        const res = await withTimeout(
            fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=MX`, {
                headers: { 'Accept': 'application/dns-json' }
            }),
            5000,
            `MX check timeout for ${domain}`
        );

        if (!res.ok) {
            console.warn(`[MX Check] DoH API failed for ${domain}, skipping check.`);
            return true; // Fail open if API is down
        }

        const data: any = await res.json();

        // Status 0 means NOERROR.
        // If Status is NXDOMAIN (3), domain doesn't exist.
        if (data.Status !== 0) {
            console.error(`[MX Check] DNS Error for ${domain}: Status ${data.Status}`);
            return false;
        }

        // Check if Answer exists and has entries
        if (!data.Answer || !Array.isArray(data.Answer) || data.Answer.length === 0) {
            console.error(`[MX Check] No MX records found for ${domain}`);
            return false;
        }

        console.log(`[MX Check] ✓ Found ${data.Answer.length} MX record(s) for ${domain}`);
        return true;
    } catch (e) {
        console.error(`[MX Check] Failed to resolve MX for ${domain}`, e);
        return true; // Fail open on network error
    }
}

// 获取 Resend 配置，优先从 D1 数据库 settings 表读取，其次从环境变量读取
// D1 settings 键名：
//   resend_key       - Resend API Key
//   resend_from      - 发件人邮箱地址
//   resend_from_name - 发件人显示名称（可选）
// 环境变量（回退方案）：
//   RESEND_KEY       - Resend API Key
//   RESEND_FROM      - 发件人邮箱地址
//   RESEND_FROM_NAME - 发件人显示名称
async function getResendConfig(env: any, db?: any): Promise<{ key: string; from: string; fromName: string }> {
    let key = '';
    let from = '';
    let fromName = DEFAULT_FROM_NAME;

    // 1. 优先从 D1 数据库 settings 表读取
    if (db) {
        try {
            const settings = await db.prepare("SELECT key, value FROM settings WHERE key IN ('resend_key', 'resend_from', 'resend_from_name')").all();
            if (settings.results) {
                for (const row of settings.results as any[]) {
                    if (row.key === 'resend_key' && row.value) key = row.value;
                    if (row.key === 'resend_from' && row.value) from = row.value;
                    if (row.key === 'resend_from_name' && row.value) fromName = row.value;
                }
            }
            if (key && from) {
                console.log('[Resend] Using config from D1 database settings');
                return { key, from, fromName };
            }
        } catch (e) {
            console.warn('[Resend] Failed to read config from D1, falling back to env vars:', e);
        }
    }

    // 2. 回退到环境变量
    if (env.RESEND_KEY) key = env.RESEND_KEY;
    if (env.RESEND_FROM) from = env.RESEND_FROM;
    if (env.RESEND_FROM_NAME) fromName = env.RESEND_FROM_NAME;

    if (!key) {
        throw new Error('缺少 Resend API Key，请在管理后台「邮件设置」中配置或设置环境变量 RESEND_KEY');
    }
    if (!from) {
        throw new Error('缺少发件人邮箱地址，请在管理后台「邮件设置」中配置或设置环境变量 RESEND_FROM');
    }

    console.log('[Resend] Using config from environment variables');
    return { key, from, fromName };
}

// Resend API 发送函数
async function sendViaResend(config: { key: string; from: string; fromName: string }, to: string, subject: string, htmlContent: string) {
    const from = `${config.fromName} <${config.from}>`;

    console.log('[Resend] Sending email via Resend API...');
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${config.key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from,
            to: [to],
            subject,
            html: htmlContent,
        })
    });

    if (!res.ok) {
        const err = await res.text();
        console.error('[Resend] API Error:', err);
        throw new Error(`Resend API 错误：${err}`);
    }

    console.log('[Resend] Email sent successfully');
}

// Main export
// env: Cloudflare Worker env bindings (用于回退读取环境变量)
// db: D1 database binding (优先从 settings 表读取 resend_* 配置)
export async function sendEmail(to: string, subject: string, htmlContent: string, env?: any, db?: any) {
    console.log(`[Email] Starting email send to ${to} - Subject: ${subject}`);

    // 1. Check MX Records first
    try {
        if (!(await checkMX(to))) {
            throw new Error(`邮箱域名无效（未找到 MX 记录：${to}）`);
        }
    } catch (e) {
        console.error('[Email] MX check failed:', e);
        throw e;
    }

    // 2. Send via Resend API
    try {
        const config = await getResendConfig(env || {}, db);
        await sendViaResend(config, to, subject, htmlContent);
        console.log(`[Email] ✓ Email successfully sent to ${to}`);
    } catch (e) {
        console.error('[Email] Failed to send email:', e);
        throw e;
    }
}
