import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'flex h-10 w-full rounded-xl border-2 border-border bg-background px-4 py-2 text-sm shadow-sm transition-all duration-200',
				'placeholder:text-muted-foreground',
				'focus-visible:outline-none focus-visible:border-sakura focus-visible:shadow-glow-pink',
				'hover:border-sakura/60',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'file:border-0 file:bg-transparent file:text-sm file:font-medium',
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = 'Input';

