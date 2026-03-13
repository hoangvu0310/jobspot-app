import { type Edges, type SafeAreaViewProps } from 'react-native-safe-area-context'
import { cn } from '@/common/utils/classname'
import React from 'react'
import { View } from 'react-native'
import { StyledSafeAreaView } from '@/components/styled'

export interface SafeAreaLayoutProps extends Omit<SafeAreaViewProps, 'className' | 'edges' | 'children'> {
	className?: string
	edges?: Edges
	children?: React.ReactNode
}

export const SafeAreaLayout = ({ className, edges, children, ...props }: SafeAreaLayoutProps) => {
	return (
		<StyledSafeAreaView className={'flex-1 bg-base-white'} edges={edges} {...props}>
			<View className={cn('flex-1 bg-base-white', className)}>{children}</View>
		</StyledSafeAreaView>
	)
}
