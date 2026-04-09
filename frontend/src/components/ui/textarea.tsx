import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
	return (
		<textarea
			ref={ref}
			className={cn(
				'flex min-h-[80px] w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm shadow-sm transition-all duration-200',
				'placeholder:text-muted-foreground',
				'focus-visible:outline-none focus-visible:border-sakura focus-visible:shadow-glow-pink',
				'hover:border-sakura/60',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'resize-y',
				className
			)}
			{...props}
		/>
	);
});
Textarea.displayName = 'Textarea';

