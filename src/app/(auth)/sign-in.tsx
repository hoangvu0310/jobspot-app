import { Input, PasswordInput, Typography } from '@/components/common'
import { SafeAreaLayout } from '@/components/layout'
import { Keyboard, Platform, TouchableWithoutFeedback, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ICONS } from '@/common/constants'

const signInSchema = z.object({
	email: z.string().min(1),
	password: z.string().min(1),
})

export default function SignInScreen() {
	const { t } = useTranslation()

	const signInForm = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	return (
		<SafeAreaLayout className={'center-content p-4'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={50}
				>
					<View className={'w-full gap-8'}>
						<Typography variant={'headlineXL'} weight={'regular'} i18nKey={'auth.signIn'} />

						<View className={'gap-6 rounded-[15px] bg-neutral-300 px-4.5 py-8'}>
							<Controller
								control={signInForm.control}
								name={'email'}
								render={({ field: { value, onChange } }) => (
									<Input
										// leftIcon={<Asset source={ICONS.Mail} />}
										leftIconSource={ICONS.Mail}
										placeholder={t('auth.email')}
										value={value}
										onChangeText={(text) => onChange(text)}
										textContentType={'oneTimeCode'}
									/>
								)}
							/>

							<Controller
								control={signInForm.control}
								name={'password'}
								render={({ field: { value, onChange } }) => (
									<PasswordInput
										placeholder={t('auth.password')}
										value={value}
										onChangeText={(text) => onChange(text)}
										textContentType={'oneTimeCode'}
									/>
								)}
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</SafeAreaLayout>
	)
}
