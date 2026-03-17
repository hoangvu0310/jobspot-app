import React, { createContext, memo, useCallback, useContext } from 'react'
import { View } from 'react-native'
import { PressableWrapper } from '@/components/common/Button'
import { Typography } from '@/components/common/Typography'
import { Asset } from '@/components/common/Asset'
import { ICONS } from '@/common/constants'
import { cn } from '@/common/utils/classname'

type IconType = 'box' | 'radio'

type CheckBoxGroupContextType<T> = {
	isChecked: (val: T) => boolean
	onToggle: (value: T) => void
	checkBoxSize?: number
	checkBoxColor?: string
	labelClassName?: string
	iconType?: IconType
}

type CheckBoxGroupBaseProps<T> = {
	containerClassName?: string
	children: React.ReactNode
	checkBoxSize?: number
	checkBoxColor?: string
	labelClassName?: string
	iconType?: IconType
	compare?: (a: T, b: T) => boolean
}

type CheckBoxGroupSingleProps<T> = CheckBoxGroupBaseProps<T> & {
	type: 'single'
	value: T | undefined
	onValueChange: (val: T | undefined) => void
}

type CheckBoxGroupMultipleProps<T> = CheckBoxGroupBaseProps<T> & {
	type: 'multiple'
	value: T[]
	onValueChange: (val: T[]) => void
}

type CheckBoxGroupProps<T> = CheckBoxGroupSingleProps<T> | CheckBoxGroupMultipleProps<T>

type CheckBoxItemProps<T> = {
	value: T
	label?: string
	className?: string
}

const CheckBoxGroupContext = createContext<CheckBoxGroupContextType<never> | null>(null)

function useCheckBoxContext<T>() {
	const ctx = useContext(CheckBoxGroupContext)

	if (!ctx) {
		throw new Error('CheckboxGroup components must be used inside CheckboxGroup')
	}

	return ctx as CheckBoxGroupContextType<T>
}

function CheckBoxGroupRoot<T>({
	type = 'single',
	value,
	onValueChange,
	containerClassName,
	children,
	checkBoxSize,
	checkBoxColor,
	labelClassName,
	iconType = 'box',
	compare = (a, b) => a === b,
}: CheckBoxGroupProps<T>) {
	const isChecked = useCallback(
		(val: T) => {
			if (type === 'single') {
				return compare(value as T, val)
			}

			return Array.isArray(value) && value.some((v) => compare(v, val))
		},
		[value, type, compare],
	)

	const onToggle = useCallback(
		(val: T) => {
			if (!onValueChange) return

			if (type === 'single') {
				if (compare(value as T, val)) {
					;(onValueChange as (val: T | undefined) => void)(undefined)
					return
				}

				;(onValueChange as (val: T) => void)(val)
				return
			}

			const arr = Array.isArray(value) ? value : []

			const exists = arr.some((v) => compare(v, val))

			if (exists) {
				;(onValueChange as (val: T[]) => void)(arr.filter((v) => !compare(v, val)))
			} else {
				;(onValueChange as (val: T[]) => void)([...arr, val])
			}
		},
		[value, type, onValueChange, compare],
	)

	return (
		<CheckBoxGroupContext.Provider
			value={{
				isChecked,
				onToggle,
				checkBoxColor,
				checkBoxSize,
				labelClassName,
				iconType,
			}}
		>
			<View className={containerClassName}>{children}</View>
		</CheckBoxGroupContext.Provider>
	)
}

const CheckBoxItem = memo(function CheckBoxItem<T>({ value, label, className }: CheckBoxItemProps<T>) {
	const { isChecked, onToggle, checkBoxSize, checkBoxColor, labelClassName, iconType } = useCheckBoxContext<T>()

	const checked = isChecked(value)

	return (
		<PressableWrapper className={cn('flex-row items-center gap-3', className)} onPress={() => onToggle(value)}>
			<Asset
				size={checkBoxSize}
				tintColorClassName={checkBoxColor}
				source={
					iconType === 'radio' ? (checked ? ICONS.RadioCheck : ICONS.RadioUncheck) : checked ? ICONS.Tick : ICONS.Untick
				}
			/>

			{label && <Typography variant={'bodyXL'} weight={'medium'} className={labelClassName} i18nKey={label} />}
		</PressableWrapper>
	)
})

export const CheckBoxGroup = Object.assign(CheckBoxGroupRoot, {
	Item: CheckBoxItem,
})
