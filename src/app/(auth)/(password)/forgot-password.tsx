import { DetailScreenLayout } from '@/components/layout'
import { ICONS, IMAGES } from '@/common/constants'
import { Button, PressableWrapper, Typography } from '@/components/common'
import { Image as RNImage, View } from 'react-native'
import { StyledImageBackground } from '@/components/styled'
import { cn } from '@/common/utils/classname'
import { Asset } from '@/components/common/Asset'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

export default function ForgotPasswordScreen() {
	const assetInfo = RNImage.resolveAssetSource(IMAGES.ForgotPassword)
	const [method, setMethod] = useState<'sms' | 'email' | undefined>(undefined)
	const router = useRouter()

	return (
		<DetailScreenLayout titleKey={'auth.forgotPassword'} containerClassName={cn('gap-12.5')}>
			<StyledImageBackground
				source={IMAGES.ForgotPassword}
				style={{ aspectRatio: assetInfo.width / assetInfo.height }}
				contentFit={'contain'}
				className={'mb-7'}
			>
				<Typography
					variant={'headlineXL'}
					weight={'medium'}
					i18nKey={'auth.unlockAccount'}
					className={'text-center text-headline-l'}
				/>
			</StyledImageBackground>

			<View className={'gap-8'}>
				<Typography
					variant={'bodyXXL'}
					weight={'medium'}
					className={'mb-1 text-gray-100'}
					i18nKey={'auth.selectResetMethod'}
				/>

				<ResetMethodCard
					label={'auth.viaSMS'}
					value={'auth.viaSMS'}
					isSelected={method === 'sms'}
					onPress={() => setMethod('sms')}
					icon={<Asset source={ICONS.SMS} size={62} />}
				/>

				<ResetMethodCard
					label={'auth.viaEmail'}
					value={'auth.viaEmail'}
					isSelected={method === 'email'}
					onPress={() => setMethod('email')}
					icon={<Asset source={ICONS.Envelope} size={68} />}
				/>
			</View>

			<Button
				variant={'rounded'}
				size={'xl'}
				label={'common.continue'}
				className={'absolute bottom-0 w-full'}
				onPress={() => router.push({ pathname: '/(auth)/(password)/otp', params: { method: method } })}
			/>
		</DetailScreenLayout>
	)
}

const ResetMethodCard = ({
	label,
	value,
	onPress,
	icon,
	isSelected,
}: {
	label: string
	value: string
	onPress: () => void
	icon: React.ReactNode
	isSelected: boolean
}) => {
	return (
		<PressableWrapper
			className={cn('border- w-3/4 flex-row items-center justify-start rounded-[30px] bg-neutral-200 px-3 py-2', {
				'shadow-[inset_0_0_0_1.5px] shadow-primary-600': isSelected,
			})}
			onPress={onPress}
		>
			{icon}
			<View className={'w-fit items-start justify-center'}>
				<Typography variant={'bodyXL'} weight={'regular'} className={'text-base-second'} i18nKey={label} />
				<Typography variant={'bodyXL'} weight={'regular'} className={'text-gray-100'} i18nKey={value} />
			</View>
		</PressableWrapper>
	)
}
