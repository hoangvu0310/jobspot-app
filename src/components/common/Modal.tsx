import { Modal, type ModalProps, View } from 'react-native'
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import { type BlurTint, BlurView } from 'expo-blur'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { runOnJS } from 'react-native-worklets'
import { cn } from '@/common/utils/classname'
import { DIMENSIONS } from '@/common/constants'
import { PressableWrapper } from '@/components/common/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface CustomModalProps extends Omit<ModalProps, 'children' | 'visible' | 'className'> {
	isOpen: boolean
	onClose: () => void
	allowCloseOnBackdropPress?: boolean
	animationDuration?: number
	blurTint?: BlurTint
	blurIntensity?: number
	backdropClassName?: string
	position?: 'top' | 'bottom' | 'center'
	children: React.ReactNode
	className?: string
}

interface CustomModalRef {
	open: () => void
	close: () => void
}

const CustomModal = memo(
	forwardRef<CustomModalRef, CustomModalProps>(
		(
			{
				isOpen,
				onClose,
				allowCloseOnBackdropPress = true,
				animationDuration = 300,
				blurTint = 'default',
				blurIntensity = 10,
				backdropClassName,
				position = 'center',
				children,
				className,
				...props
			}: CustomModalProps,
			ref,
		) => {
			const [visible, setVisible] = useState<boolean>(false)
			const insets = useSafeAreaInsets()
			const backdropOpacity = useSharedValue(0)
			const modalTranslateY = useSharedValue(position === 'bottom' ? DIMENSIONS.height : 0)
			const modalScale = useSharedValue(0.9)

			const backdropAnimatedStyle = useAnimatedStyle(() => ({
				opacity: backdropOpacity.value,
			}))

			const modalAnimatedStyle = useAnimatedStyle(() => ({
				transform: [{ scale: position === 'center' ? modalScale.value : 1 }, { translateY: modalTranslateY.value }],
			}))

			useImperativeHandle(ref, () => ({
				open: () => setVisible(true),
				close: onClose,
			}))

			useEffect(() => {
				if (isOpen) {
					setVisible(true)
					backdropOpacity.value = withTiming(1, { duration: animationDuration })

					if (position === 'center') {
						modalScale.value = withTiming(1, { duration: animationDuration })
					} else {
						modalTranslateY.value = withTiming(0, { duration: animationDuration })
					}
				} else {
					backdropOpacity.value = withTiming(0, { duration: animationDuration })

					if (position === 'center') {
						modalScale.value = withTiming(0.9, { duration: animationDuration }, (finished) => {
							if (finished) runOnJS(setVisible)(false)
						})
					} else {
						modalTranslateY.value = withTiming(DIMENSIONS.height, { duration: animationDuration }, (finished) => {
							if (finished) runOnJS(setVisible)(false)
						})
					}
				}
			}, [animationDuration, backdropOpacity, isOpen, modalScale, modalTranslateY, position])

			return (
				<Modal animationType={'none'} visible={visible} transparent={true} {...props}>
					<PressableWrapper
						activeOpacity={1}
						disabled={!allowCloseOnBackdropPress}
						className={'flex-1'}
						onPress={onClose}
					>
						<Animated.View className={'flex-1'} style={backdropAnimatedStyle}>
							<View className={cn('absolute inset-0 bg-base-black/40', backdropClassName)}>
								<BlurView className={'flex-1'} intensity={blurIntensity} tint={blurTint} />
							</View>

							<View
								className={cn('flex-1', {
									'items-center justify-start': position === 'top',
									'items-center justify-center': position === 'center',
									'items-center justify-end': position === 'bottom',
								})}
								style={{
									paddingBottom: position === 'bottom' ? insets.bottom : 0,
									paddingTop: position === 'top' ? insets.top : 0,
								}}
							>
								<Animated.View className={cn('center-content', className)} style={modalAnimatedStyle}>
									<PressableWrapper activeOpacity={1} className={'center-content flex-1'}>
										{children}
									</PressableWrapper>
								</Animated.View>
							</View>
						</Animated.View>
					</PressableWrapper>
				</Modal>
			)
		},
	),
)

CustomModal.displayName = 'CustomModal'

export { CustomModal, type CustomModalRef }
