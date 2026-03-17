import { type ImageProps } from 'expo-image'
import { StyledImage } from '@/components/styled'
import { PressableWrapper } from '@/components/common/Button'

interface AssetProps extends Omit<ImageProps, 'className'> {
	size?: number
	tintColorClassName?: string
	className?: string
	onPress?: () => void
	activeOpacity?: number
}

export const Asset = ({
	size = 28,
	tintColorClassName,
	className,
	onPress,
	activeOpacity = 0.8,
	...props
}: AssetProps) => {
	return (
		<>
			{onPress === undefined ? (
				<StyledImage
					style={{ width: size, height: size }}
					tintColorClassName={tintColorClassName}
					className={className}
					{...props}
				/>
			) : (
				<PressableWrapper onPress={onPress} activeOpacity={activeOpacity}>
					<StyledImage
						style={{ width: size, height: size }}
						tintColorClassName={tintColorClassName}
						className={className}
						{...props}
					/>
				</PressableWrapper>
			)}
		</>
	)
}
