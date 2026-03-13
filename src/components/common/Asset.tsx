import { type ImageProps } from 'expo-image'
import { StyledImage } from '@/components/styled'
import { Pressable } from 'react-native'

interface AssetProps extends Omit<ImageProps, 'className'> {
	size?: number
	tintColorClassName?: string
	className?: string
	onPress?: () => void
	activeOpacity?: number
}

export const Asset = ({
	size = 28,
	tintColorClassName = 'accent-base-main',
	className,
	onPress,
	activeOpacity = 0.8,
	...props
}: AssetProps) => {
	return (
		<Pressable
			disabled={onPress === null}
			onPress={onPress}
			style={({ pressed }) => ({ opacity: pressed ? activeOpacity : 1 })}
		>
			<StyledImage
				style={{ width: size, height: size }}
				tintColorClassName={tintColorClassName}
				className={className}
				{...props}
			/>
		</Pressable>
	)
}
