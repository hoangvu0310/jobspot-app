import React, { forwardRef, memo } from 'react'
import { Pressable, type PressableProps, View } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/common/utils/classname'
import { Typography } from '@/components/common/Typography'

export interface PressableWrapperProps extends Omit<PressableProps, 'children'> {
	activeOpacity?: number
	children: React.ReactNode
}

export const PressableWrapper = memo(
	forwardRef<View, PressableWrapperProps>(({ activeOpacity = 0.8, children, ...props }: PressableWrapperProps, ref) => {
		return (
			<Pressable ref={ref} style={({ pressed }) => ({ opacity: pressed ? activeOpacity : 1 })} {...props}>
				{children}
			</Pressable>
		)
	}),
)

const buttonVariants = cva('bg-primary-600', {
	variants: {
		variant: {
			rect: '',
			semi: 'rounded-md',
			rounded: 'rounded-full',
		},
		size: {
			xs: 'px-3 py-2',
			sm: 'px-5 py-2',
			md: 'px-6 py-2.5',
			lg: 'px-7 py-3',
			xl: 'px-8 py-4',
		},
		shadow: {
			none: '',
			true: 'shadow-[0px_3px_10px_5px] shadow-primary-300/50',
		},
	},
	defaultVariants: {
		variant: 'rounded',
		size: 'xl',
		shadow: true,
	},
})

type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps extends ButtonVariants, React.ComponentPropsWithoutRef<typeof Pressable> {
	label: string
	rightIcon?: React.ReactNode
	leftIcon?: React.ReactNode
	labelClassName?: string
}

const Button = memo(
	forwardRef<View, ButtonProps>(
		({ variant, size, shadow, label, rightIcon, leftIcon, className, labelClassName, ...props }: ButtonProps, ref) => {
			return (
				<PressableWrapper
					ref={ref}
					className={cn(
						buttonVariants({ variant: variant, size: size, shadow: shadow }),
						'center-content flex-row gap-2',
						className,
					)}
					{...props}
				>
					{leftIcon && leftIcon}
					<Typography
						variant={'bodyXL'}
						weight={'semibold'}
						i18nKey={label}
						className={cn('text-white', labelClassName)}
					/>
					{rightIcon && rightIcon}
				</PressableWrapper>
			)
		},
	),
)

Button.displayName = 'Button'

export { Button }
