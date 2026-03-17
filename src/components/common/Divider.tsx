import { View } from 'react-native'
import { cn } from '@/common/utils/classname'

type DividerProps = {
	direction?: 'horizontal' | 'vertical'
	dividerStyle?: 'line' | 'dashed'
	dividerClassName?: string
}

export const Divider = ({ direction = 'horizontal', dividerStyle = 'dashed', dividerClassName }: DividerProps) => {
	return (
		<View
			className={cn(
				'border-base-second',
				{
					'border-dashed': dividerStyle === 'dashed',
					'w-0 flex-1 border-l-2': direction === 'vertical',
					'h-0 flex-1 border-b-2': direction === 'horizontal',
				},
				dividerClassName,
			)}
		/>
	)
}
