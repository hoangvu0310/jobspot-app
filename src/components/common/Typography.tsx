import { cva, type VariantProps } from 'class-variance-authority'
import { Text, type TextProps } from 'react-native'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/common/utils/classname'

const typographyVariants = cva('text-base-black dark:text-base-white', {
	variants: {
		variant: {
			headlineXL: 'text-headline-xl leading-11',
			navHeader: 'text-[26px] leading-normal',
			bodyXXL: 'text-body-xxl leading-normal',
			bodyXL: 'text-body-xl leading-7',
			bodyL: 'text-body-l leading-6',
			bodyM: 'text-body-m leading-5.5',
			bodyS: 'text-body-s leading-5',
			bodyXS: 'text-body-xs leading-4.5',
		},
		weight: {
			regular: 'font-app-regular',
			medium: 'font-app-medium',
			semibold: 'font-app-semibold',
			bold: 'font-app-bold',
		},
	},
	defaultVariants: {},
})

export type TextVariantProps = VariantProps<typeof typographyVariants>

export interface TypographyProps extends Omit<TextProps, 'style' | 'children'>, TextVariantProps {
	className?: string
	children?: React.ReactNode
	i18nKey?: string
}

const Typography = memo<TypographyProps>(
	({ variant, weight, className, children, i18nKey, ...props }: TypographyProps) => {
		const { t } = useTranslation()
		const content = i18nKey ? t(i18nKey) : children

		return (
			<Text className={cn(typographyVariants({ variant, weight }), className)} {...props}>
				{content}
			</Text>
		)
	},
)

Typography.displayName = 'Typography'

export { Typography }
