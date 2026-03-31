import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SafeAreaLayout } from '@/components/layout'
import { Keyboard, Platform, TouchableWithoutFeedback, View } from 'react-native'
import { StyledKeyboardAvoidingView } from '@/components/styled'
import { Button, CheckBoxGroup, Divider, Input, PasswordInput, PressableWrapper, Typography } from '@/components/common'
import { ICONS } from '@/common/constants'
import { cn } from '@/common/utils/classname'
import { Asset } from '@/components/common/Asset'
import { z } from 'zod'
import { useRouter } from 'expo-router'

const signUpSchema = z
	.object({
		email: z.string().min(1, { error: 'error.requireEmail' }),
		password: z.string().min(1, { error: 'error.requirePassword' }),
		confirmPassword: z.string().min(1, { error: 'error.requirePasswordConfirm' }),
	})
	.refine((form) => form.password === form.confirmPassword, {
		error: 'error.passwordNotMatch',
		path: ['confirmPassword'],
	})

export default function SignUpScreen() {
	const { t } = useTranslation()
	const router = useRouter()
	const [isRememberMe, setIsRememberMe] = useState<boolean | undefined>(undefined)

	const signUpForm = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const signUp = useCallback(() => {
		Keyboard.dismiss()
		router.replace('/(profile-setup)')
	}, [router])

	const onPressToSignIn = () => {
		if (router.canGoBack()) {
			router.back()
			return
		}

		router.replace('/(auth)/sign-in')
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaLayout className={'center-content p-4'}>
				<View className={'mb-1 w-full flex-1 items-center justify-end'}>
					<View className={'w-full gap-8'}>
						<Typography weight={'semibold'} i18nKey={'auth.signUp'} className={'text-center text-[40px]'} />

						<StyledKeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
							<View className={'gap-6 rounded-[15px] bg-neutral-300 px-4.5 py-8'}>
								<Controller
									control={signUpForm.control}
									name={'email'}
									render={({ field: { value, onChange } }) => (
										<Input
											leftIconSource={ICONS.Mail}
											placeholder={t('auth.email')}
											value={value}
											onChangeText={(text) => onChange(text)}
											textContentType={'oneTimeCode'}
											error={signUpForm.formState.errors.email?.message}
										/>
									)}
								/>

								<Controller
									control={signUpForm.control}
									name={'password'}
									render={({ field: { value, onChange } }) => (
										<PasswordInput
											placeholder={t('auth.password')}
											value={value}
											onChangeText={(text) => onChange(text)}
											textContentType={'oneTimeCode'}
											error={signUpForm.formState.errors.password?.message}
										/>
									)}
								/>

								<Controller
									control={signUpForm.control}
									name={'confirmPassword'}
									render={({ field: { value, onChange } }) => (
										<PasswordInput
											placeholder={t('auth.confirmPassword')}
											value={value}
											onChangeText={(text) => onChange(text)}
											textContentType={'oneTimeCode'}
											error={signUpForm.formState.errors.confirmPassword?.message}
										/>
									)}
								/>

								<CheckBoxGroup<boolean>
									type={'single'}
									value={isRememberMe}
									onValueChange={setIsRememberMe}
									labelClassName={cn('text-gray-100')}
									checkBoxSize={24}
								>
									<CheckBoxGroup.Item value={true} label={'auth.rememberMe'} />
								</CheckBoxGroup>

								<Button label={'auth.signUp'} onPress={signUpForm.handleSubmit(signUp)} />
							</View>
						</StyledKeyboardAvoidingView>
					</View>

					<View className={'center-content mt-9.5 gap-12.5'}>
						<View className={'gap-2.25'}>
							<View className={'center-content flex-row gap-5'}>
								<Divider dividerClassName={cn('border-b-2 flex-none w-15')} />
								<Typography
									variant={'bodyXXL'}
									weight={'semibold'}
									className={'text-center text-gray-100'}
									i18nKey={'auth.continue'}
								/>
								<Divider dividerClassName={cn('border-b-2 flex-none w-15')} />
							</View>

							<View className={'center-content flex-row gap-6'}>
								<Asset source={ICONS.Facebook} size={64} onPress={() => {}} />
								<Asset source={ICONS.Google} size={64} onPress={() => {}} />
								<Asset source={ICONS.Twitter} size={64} onPress={() => {}} />
							</View>
						</View>

						<PressableWrapper onPress={onPressToSignIn}>
							<Typography variant={'bodyXL'} weight={'regular'} className={'text-base-second'}>
								{t('auth.alreadyHaveAccount')}
								<Typography className={'text-primary-600'} i18nKey={'auth.signInRoute'} />
							</Typography>
						</PressableWrapper>
					</View>
				</View>
			</SafeAreaLayout>
		</TouchableWithoutFeedback>
	)
}
