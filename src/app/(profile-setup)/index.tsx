import { DetailScreenLayout } from '@/components/layout'
import { View } from 'react-native'
import { Button, PressableWrapper, Typography } from '@/components/common'
import { Asset } from '@/components/common/Asset'
import { IMAGES } from '@/common/constants'
import { useRouter } from 'expo-router'

export default function SetupProfileWelcomeScreen() {
	const router = useRouter()

	const onContinue = () => {
		router.push('/(profile-setup)/setup')
	}

	const onSkip = () => {
		router.replace('/(main)/home')
	}

	return (
		<DetailScreenLayout canGoBack={false} titleKey={'profileSetup.setupYourProfile'} containerClassName={'gap-[25px]'}>
			<View className={'flex-1 gap-17.5'}>
				<Typography
					variant={'bodyXXL'}
					weight={'regular'}
					i18nKey={'profileSetup.completeYourProfile'}
					className={'text-base-second'}
				/>

				<Asset source={IMAGES.SetupProfile} assetType={'image'} />
			</View>

			<View className={'center-content mb-10 w-full gap-8 px-4'}>
				<Button label={'common.continue'} onPress={onContinue} className={'w-full'} />
				<PressableWrapper onPress={onSkip}>
					<Typography
						variant={'bodyXXL'}
						weight={'semibold'}
						i18nKey={'profileSetup.skipForNow'}
						className={'text-purple-400'}
					/>
				</PressableWrapper>
			</View>
		</DetailScreenLayout>
	)
}
