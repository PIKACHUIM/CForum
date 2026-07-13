import * as React from 'react';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';

/**
 * 现代毛玻璃风格认证页面背景容器
 * 包含论坛品牌标识展示区
 */
export function AuthPageShell({
	children,
	className,
	icon,
	subtitle
}: {
	children: React.ReactNode;
	className?: string;
	/** 当没有自定义 Logo 时使用的 emoji 图标 */
	icon?: string;
	/** 品牌副标题，如"欢迎回来" */
	subtitle?: string;
}) {
	const { config } = useConfig();

	React.useEffect(() => {
		if (!config) return;
		if (config.site_title) {
			const current = document.title;
			const sep = current.indexOf(' - ');
			const prefix = sep !== -1 ? current.slice(0, sep + 3) : '';
			document.title = prefix + config.site_title;
		}
		if (config.site_favicon_url) {
			let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
			if (!link) {
				link = document.createElement('link');
				link.rel = 'icon';
				document.head.appendChild(link);
			}
			link.href = config.site_favicon_url;
		}
	}, [config]);

	const siteTitle = config?.site_title || '论坛';
	const siteLogo = config?.site_logo_url;

	return (
		<div className={cn(
			'min-h-dvh relative overflow-hidden bg-background',
			className
		)}>
			{/* 增强背景光晕 */}
			<div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
				{/* 主色调光晕 - 左上 */}
				<div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-primary/8 blur-[130px] animate-pulse" />
				{/* 辅色调光晕 - 右下 */}
				<div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-accent/12 blur-[110px]" />
				{/* 点缀光晕 - 中上 */}
				<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[20rem] h-[20rem] rounded-full bg-primary/4 blur-[90px]" />
			</div>

			{/* 装饰网格 */}
			<div className="pointer-events-none select-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
					backgroundSize: '40px 40px'
				}}
			/>

			<main className="relative z-10 mx-auto flex min-h-dvh max-w-5xl flex-col items-center justify-center gap-8 px-4 py-10">
				{/* 论坛品牌标识区 */}
				<div className="flex flex-col items-center gap-3 animate-slide-up">
					{siteLogo ? (
						<img
							src={siteLogo}
							alt={siteTitle}
							className="h-16 max-w-[200px] object-contain rounded-xl"
						/>
					) : (
						<div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 ring-1 ring-primary/20">
							<span className="text-3xl animate-bounce-gentle">{icon || '🌸'}</span>
						</div>
					)}
					<h1 className="font-display text-2xl sm:text-3xl font-bold text-primary tracking-wide">
						{siteTitle}
					</h1>
					{subtitle && (
						<>
							<div className="flex items-center gap-3 w-48">
								<div className="h-px flex-1 bg-border" />
								<span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
									{subtitle}
								</span>
								<div className="h-px flex-1 bg-border" />
							</div>
						</>
					)}
				</div>

				{children}
			</main>
		</div>
	);
}

/**
 * 现代毛玻璃认证卡片
 */
export function AuthCard({
	children,
	className
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn(
			'w-full max-w-md animate-slide-up',
			'glass rounded-2xl',
			className
		)}>
			{children}
		</div>
	);
}
