import { cva, type VariantProps } from 'class-variance-authority'
import React, { forwardRef, memo, useState } from 'react'
import { type ImageSourcePropType, TextInput, View } from 'react-native'
import { Typography } from '@/components/common/Typography'
import type { ClassValue } from 'clsx'
import { cn } from '@/common/utils/classname'
import { Asset } from '@/components/common/Asset'
import { ICONS } from '@/common/constants'

export const inputVariants = cva('border border-border-main bg-base-white', {
	variants: {
		variant: {
			round: 'rounded-[128px]',
			rectangular: 'rounded-2xl',
		},
		size: {
			small: 'px-3',
			medium: 'px-7.5',
			large: 'px-7.5',
		},
	},
	defaultVariants: {
		variant: 'round',
		size: 'large',
	},
})

export type InputVariantProps = VariantProps<typeof inputVariants>

export interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput>, InputVariantProps {
	label?: string
	error?: string
	hintText?: string
	rightIcon?: React.ReactNode
	leftIcon?: React.ReactNode
	leftIconSource?: ImageSourcePropType
	rightIconSource?: ImageSourcePropType
	onPressRightIcon?: () => void
	onPressLeftIcon?: () => void
	iconSize?: number
	containerClassName?: ClassValue
}

export type PasswordInputProps = Omit<InputProps, 'leftIconSource' | 'rightIconSource'>

const Input = memo(
	forwardRef<TextInput, InputProps>(
		(
			{
				label,
				error,
				hintText,
				leftIcon,
				rightIcon,
				leftIconSource,
				rightIconSource,
				onPressLeftIcon,
				onPressRightIcon,
				iconSize = 28,
				containerClassName,
				className,
				variant,
				size = 'large',
				editable = true,
				...props
			},
			ref,
		) => {
			const [isFocused, setIsFocused] = useState(false)

			const finalText = error || hintText
			const isDisabled = !editable || false
			const focusErrorStyle = cn({
				'border-error-700 outline-border-error': isFocused && error,
				'bg-primary-25 border-primary-700 outline-2 outline-border-focus': isFocused && !error,
				'border-error-700': !isFocused && error,
				'bg-neutral-100': isDisabled,
			})

			return (
				<View className={'gap-1.5'}>
					{label && (
						<Typography
							variant={'bodyXL'}
							weight={'semibold'}
							className={cn(isDisabled ? 'text-base-second' : 'text-gray-100')}
							i18nKey={label}
						/>
					)}
					<View
						className={cn(
							'flex-row items-center gap-4',
							inputVariants({ variant: variant, size: size }),
							focusErrorStyle,
							containerClassName,
						)}
					>
						{leftIcon
							? leftIcon
							: leftIconSource && (
									<Asset
										source={leftIconSource}
										size={iconSize}
										onPress={onPressLeftIcon}
										tintColorClassName={cn('accent-base-main', {
											'accent-primary-300': isFocused,
											'accent-error-700': error,
										})}
									/>
								)}
						<TextInput
							className={cn(
								'flex-1 text-body-xl font-semibold',
								{ 'py-4': size === 'small', 'py-5': size === 'medium', 'py-5.75': size === 'large' },
								className,
							)}
							placeholderTextColorClassName={cn('accent-base-main')}
							cursorColorClassName={cn(error ? 'accent-error-700' : 'accent-base-black')}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							autoCorrect={false}
							editable={editable}
							{...props}
							ref={ref}
						/>
						{rightIcon
							? rightIcon
							: rightIconSource && (
									<Asset
										source={rightIconSource}
										size={iconSize}
										onPress={onPressRightIcon}
										tintColorClassName={cn('accent-base-main', {
											'accent-primary-300': isFocused,
											'accent-error-700': error,
										})}
									/>
								)}
					</View>
					{finalText && (
						<Typography
							variant={'bodyS'}
							weight={'regular'}
							className={cn(error && 'text-error-700', !error && 'text-base-main')}
							i18nKey={finalText}
						/>
					)}
				</View>
			)
		},
	),
)

const PasswordInput = memo(
	forwardRef<TextInput, PasswordInputProps>((props, ref) => {
		const [showPassword, setShowPassword] = useState(false)

		const togglePasswordVisibility = () => {
			setShowPassword(!showPassword)
		}

		return (
			<Input
				secureTextEntry={!showPassword}
				leftIconSource={ICONS.Unlock}
				rightIconSource={showPassword ? ICONS.EyeHide : ICONS.EyeHide}
				onPressRightIcon={togglePasswordVisibility}
				{...props}
				ref={ref}
			/>
		)
	}),
)

Input.displayName = 'Input'
PasswordInput.displayName = 'PasswordInput'

export { Input, PasswordInput }
