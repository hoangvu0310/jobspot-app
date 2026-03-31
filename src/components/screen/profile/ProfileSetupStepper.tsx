import { type LayoutChangeEvent, type LayoutRectangle, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect, useState } from 'react'
import { cn } from '@/common/utils/classname'

type ProfileSetupStepperProps = {
	step: number
	totalStep: number
	containerClassName?: string
	indicatorClassName?: string
}

export const ProfileSetupStepper = ({
	step,
	totalStep,
	containerClassName,
	indicatorClassName,
}: ProfileSetupStepperProps) => {
	const currentStep = useSharedValue(0)
	const [containerLayout, setContainerLayout] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 })

	const animatedIndicatorStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: currentStep.value * (containerLayout?.width / totalStep),
			},
		],
	}))

	const onContainerLayout = (e: LayoutChangeEvent) => {
		setContainerLayout(e.nativeEvent.layout)
	}

	useEffect(() => {
		currentStep.value = withTiming(step, { duration: 200 })
	}, [currentStep, step])

	return (
		<View onLayout={onContainerLayout} className={cn('h-4 rounded-[13px] bg-neutral-400', containerClassName)}>
			<Animated.View
				className={cn('h-4 rounded-[13px] bg-purple-400', indicatorClassName)}
				style={[{ width: containerLayout?.width / totalStep }, animatedIndicatorStyle]}
			/>
		</View>
	)
}
