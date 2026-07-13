import * as React from 'react';

import type { ForumConfig } from '@/lib/api';

export function useConfig() {
	const [config, setConfig] = React.useState<ForumConfig | null>(null);
	const [error, setError] = React.useState<string>('');

	React.useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch('/api/config');
				if (!res.ok) throw new Error('无法加载站点配置');
				const data = (await res.json()) as ForumConfig;
			if (!cancelled) {
					setConfig(data);
					// 缓存站点标题到 localStorage，供 HTML 内联脚本同步读取，避免标题闪烁
					if (data.site_title) {
						try { localStorage.setItem('cached_site_title', data.site_title); } catch (_) {}
					}
				}
			} catch (e: any) {
				if (!cancelled) setError(String(e?.message || e));
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	return { config, error };
}

