import { cx } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

// using cx from cva as it is the export of clsx from cva package
export function cn(...inputs: string[]) {
	return twMerge(cx(...inputs))
}
