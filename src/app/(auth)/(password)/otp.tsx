import { DetailScreenLayout } from '@/components/layout'
import { Button, Typography } from '@/components/common'
import { OTPInput } from '@/components/screen/auth'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Keyboard, Platform, Pressable, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { StyledKeyboardAvoidingView } from '@/components/styled'

export default function OTPScreen() {
	const { method } = useLocalSearchParams<{ method: 'sms' | 'email' }>()
	const { t } = useTranslation()
	const router = useRouter()
	const [otp, setOTP] = useState<string>('')

	return (
		<Pressable onPress={Keyboard.dismiss} className={'flex-1'}>
			<DetailScreenLayout titleKey={'auth.forgotPassword'}>
				<View className={'center-content flex-1'}>
					<Typography
						variant={'headlineXL'}
						weight={'semibold'}
						className={'text-headline-l'}
						i18nKey={'auth.fourDigitCode'}
					/>

					<Typography variant={'bodyXXL'} weight={'regular'} className={'mt-5 mb-10 text-gray-100'}>
						{t('auth.enterCode')}
						<Typography weight={'semibold'} className={'text-center text-primary-600'}>
							{'\n+84 971530310'}
						</Typography>
					</Typography>

					<StyledKeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
						<OTPInput value={otp} onChange={setOTP} />
					</StyledKeyboardAvoidingView>

					<Typography variant={'bodyXL'} weight={'semibold'} className={'text-base-seconds mt-7 mb-8'}>
						{t('auth.resendCodeIn')}
						<Typography className={'text-primary-600'}>{' 60s'}</Typography>
					</Typography>

					<Typography
						variant={'bodyXL'}
						weight={'bold'}
						className={'text-primary-600'}
						i18nKey={method === 'sms' ? 'auth.changeNumber' : 'auth.changeEmail'}
					/>
				</View>

				<Button
					variant={'rounded'}
					size={'xl'}
					label={'common.continue'}
					onPress={() => router.push('/(auth)/(password)/new-password')}
				/>
			</DetailScreenLayout>
		</Pressable>
	)
}
