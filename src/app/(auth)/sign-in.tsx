import { Button, CheckBoxGroup, Divider, Input, PasswordInput, PressableWrapper, Typography } from '@/components/common'
import { SafeAreaLayout } from '@/components/layout'
import { Keyboard, Platform, TouchableWithoutFeedback, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ICONS } from '@/common/constants'
import { useCallback, useState } from 'react'
import { cn } from '@/common/utils/classname'
import { Asset } from '@/components/common/Asset'
import { StyledKeyboardAvoidingView } from '@/components/styled'
import { useRouter } from 'expo-router'

const signInSchema = z.object({
	email: z.string().min(1, { error: 'error.requireUsername' }),
	password: z.string().min(1, { error: 'error.requirePassword' }),
})

export default function SignInScreen() {
	const { t } = useTranslation()
	const router = useRouter()
	const [isKeepSignIn, setIsKeepSignIn] = useState<boolean | undefined>(undefined)

	const signInForm = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const signIn = useCallback(() => {
		Keyboard.dismiss()
	}, [])

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaLayout className={'center-content p-4'}>
				<View className={'mb-1 w-full flex-1 items-center justify-end'}>
					<View className={'w-full gap-8'}>
						<Typography weight={'semibold'} i18nKey={'auth.signIn'} className={'text-center text-[40px]'} />

						<StyledKeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
							<View className={'gap-6 rounded-[15px] bg-neutral-300 px-4.5 py-8'}>
								<Controller
									control={signInForm.control}
									name={'email'}
									render={({ field: { value, onChange } }) => (
										<Input
											leftIconSource={ICONS.Mail}
											placeholder={t('auth.email')}
											value={value}
											onChangeText={(text) => onChange(text)}
											textContentType={'oneTimeCode'}
											error={signInForm.formState.errors.email?.message}
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
											error={signInForm.formState.errors.password?.message}
										/>
									)}
								/>

								<CheckBoxGroup<boolean>
									type={'single'}
									value={isKeepSignIn}
									onValueChange={setIsKeepSignIn}
									labelClassName={cn('text-gray-100')}
									checkBoxSize={24}
								>
									<CheckBoxGroup.Item value={true} label={'auth.keepSignIn'} />
								</CheckBoxGroup>

								<Button label={'auth.signIn'} onPress={signInForm.handleSubmit(signIn)} />
							</View>
						</StyledKeyboardAvoidingView>
					</View>

					<View className={'center-content gap-12.5'}>
						<PressableWrapper onPress={() => {}}>
							<Typography
								variant={'bodyXXL'}
								weight={'semibold'}
								className={'pt-5 text-gray-100'}
								i18nKey={'auth.forgotPassword'}
							/>
						</PressableWrapper>

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

						<PressableWrapper onPress={() => router.push('/(auth)/sign-up')}>
							<Typography variant={'bodyXL'} weight={'regular'} className={'text-base-second'}>
								{t('auth.dontHaveAccount')}
								<Typography className={'text-primary-600'} i18nKey={'auth.signUpRoute'} />
							</Typography>
						</PressableWrapper>
					</View>
				</View>
			</SafeAreaLayout>
		</TouchableWithoutFeedback>
	)
}
