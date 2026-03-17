import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

export const twMergeLocal = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [
				'text-body-xxs',
				'text-body-xs',
				'text-body-s',
				'text-body-m',
				'text-body-l',
				'text-body-xl',
				'text-body-xxl',
				'text-headline-xs',
				'text-headline-s',
				'text-headline-m',
				'text-headline-l',
				'text-headline-xl',
			],
		},
	},
})

// ClassName utility function
export function cn(...inputs: ClassValue[]) {
	return twMergeLocal(clsx(...inputs))
}
