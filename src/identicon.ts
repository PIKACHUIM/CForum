export async function generateIdenticon(seed: string): Promise<string> {
    // 使用 DiceBear 公开 API 生成头像 URL，避免 base64 过长问题
    const encodedSeed = encodeURIComponent(seed);
    return `https://api.dicebear.com/9.x/identicon/svg?seed=${encodedSeed}`;
}
