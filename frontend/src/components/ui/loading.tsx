import * as React from 'react';
import { cn } from '@/lib/utils';

interface LoadingProps {
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	text?: string;
}

/**
 * 可爱二次元风格加载动画组件
 */
export function AnimeLoading({ className, size = 'md', text }: LoadingProps) {
	const sizeMap = {
		sm: 'text-lg gap-1',
		md: 'text-2xl gap-2',
		lg: 'text-4xl gap-3',
	};

	return (
		<div className={cn('flex flex-col items-center justify-center', className)}>
			<div className={cn('flex items-center', sizeMap[size])}>
				<span className="animate-twinkle" style={{ animationDelay: '0s' }}>✨</span>
				<span className="animate-heartbeat" style={{ animationDelay: '0.2s' }}>💖</span>
				<span className="animate-twinkle" style={{ animationDelay: '0.4s' }}>✨</span>
			</div>
			{text && (
				<p className="mt-2 text-sm text-muted-foreground font-display animate-pulse">{text}</p>
			)}
		</div>
	);
}

/**
 * 旋转星星加载动画
 */
export function StarLoading({ className, size = 'md' }: Omit<LoadingProps, 'text'>) {
	const sizeMap = {
		sm: 'text-base',
		md: 'text-2xl',
		lg: 'text-4xl',
	};

	return (
		<span className={cn('inline-block animate-spin-slow', sizeMap[size], className)}>
			⭐
		</span>
	);
}

/**
 * 心形跳动加载动画
 */
export function HeartLoading({ className, size = 'md' }: Omit<LoadingProps, 'text'>) {
	const sizeMap = {
		sm: 'text-base',
		md: 'text-2xl',
		lg: 'text-4xl',
	};

	return (
		<span className={cn('inline-block animate-heartbeat', sizeMap[size], className)}>
			💗
		</span>
	);
}
