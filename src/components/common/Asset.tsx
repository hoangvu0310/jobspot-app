import { type ImageProps } from 'expo-image'
import { StyledImage } from '@/components/styled'
import { PressableWrapper } from '@/components/common/Button'
import { Image as RNImage, type ImageSourcePropType } from 'react-native'

interface AssetProps extends Omit<ImageProps, 'className'> {
	size?: number
	tintColorClassName?: string
	className?: string
	onPress?: () => void
	activeOpacity?: number
	assetType?: 'image' | 'icon'
}

export const Asset = ({
	size = 28,
	tintColorClassName,
	className,
	onPress,
	activeOpacity = 0.8,
	assetType = 'icon',
	...props
}: AssetProps) => {
	const assetInfo = RNImage.resolveAssetSource(props.source as ImageSourcePropType)

	return (
		<>
			{onPress === undefined ? (
				<StyledImage
					style={
						assetType === 'icon' ? { width: size, height: size } : { aspectRatio: assetInfo.width / assetInfo.height }
					}
					tintColorClassName={tintColorClassName}
					className={className}
					{...props}
				/>
			) : (
				<PressableWrapper onPress={onPress} activeOpacity={activeOpacity}>
					<StyledImage
						style={
							assetType === 'icon' ? { width: size, height: size } : { aspectRatio: assetInfo.width / assetInfo.height }
						}
						tintColorClassName={tintColorClassName}
						className={className}
						{...props}
					/>
				</PressableWrapper>
			)}
		</>
	)
}
