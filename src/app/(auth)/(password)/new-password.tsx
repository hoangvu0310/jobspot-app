import { DetailScreenLayout } from '@/components/layout'
import { View } from 'react-native'
import { Asset } from '@/components/common/Asset'
import { IMAGES } from '@/common/constants'
import { Button, CheckBoxGroup, CustomModal, PasswordInput, Typography } from '@/components/common'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useCallback, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/common/utils/classname'
import { useRouter } from 'expo-router'

const createNewPasswordSchema = z
	.object({
		password: z.string().min(1, { error: 'error.requirePassword' }),
		confirmPassword: z.string().min(1, { error: 'error.requirePasswordConfirm' }),
	})
	.refine((form) => form.password === form.confirmPassword, {
		error: 'error.passwordNotMatch',
		path: ['confirmPassword'],
	})

export default function NewPasswordScreen() {
	const { t } = useTranslation()
	const router = useRouter()
	const [isRememberMe, setIsRememberMe] = useState<boolean | undefined>(undefined)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const createNewPasswordForm = useForm<z.infer<typeof createNewPasswordSchema>>({
		resolver: zodResolver(createNewPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmitNewPassword = useCallback(() => {
		setIsModalOpen(true)
	}, [])

	const onCreateSuccessConfirm = () => {
		setIsModalOpen(false)
		router.replace('/(auth)/sign-in')
	}

	return (
		<DetailScreenLayout titleKey={'auth.createPassword'}>
			<View className={'flex-1 gap-9 py-8.5'}>
				<Asset source={IMAGES.CreatePassword} contentFit={'contain'} assetType={'image'} />

				<View className={'gap-6 px-4'}>
					<Typography
						variant={'bodyXXL'}
						weight={'medium'}
						i18nKey={'auth.createNewPassword'}
						className={'mb-1 text-gray-100'}
					/>

					<Controller
						control={createNewPasswordForm.control}
						name={'password'}
						render={({ field: { value, onChange } }) => (
							<PasswordInput
								placeholder={t('auth.password')}
								value={value}
								onChangeText={(text) => onChange(text)}
								textContentType={'oneTimeCode'}
								error={createNewPasswordForm.formState.errors.password?.message}
							/>
						)}
					/>

					<Controller
						control={createNewPasswordForm.control}
						name={'confirmPassword'}
						render={({ field: { value, onChange } }) => (
							<PasswordInput
								placeholder={t('auth.confirmPassword')}
								value={value}
								onChangeText={(text) => onChange(text)}
								textContentType={'oneTimeCode'}
								error={createNewPasswordForm.formState.errors.confirmPassword?.message}
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
				</View>
			</View>

			<Button
				variant={'rounded'}
				size={'xl'}
				label={'common.continue'}
				onPress={() => createNewPasswordForm.handleSubmit(onSubmitNewPassword)()}
			/>

			<CustomModal position={'center'} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<View className={'center-content w-4/5 gap-1.5 rounded-[30px] bg-base-white px-2 py-12.5'}>
					<Asset source={IMAGES.ResetPasswordSuccess} assetType={'image'} contentFit={'contain'} className={'w-full'} />

					<View className={'center-content gap-5 px-4 text-center'}>
						<Typography variant={'headlineXL'} weight={'bold'} i18nKey={'auth.congratulations'} />
						<Typography
							variant={'bodyXL'}
							weight={'medium'}
							className={'mt-1 text-center text-gray-100'}
							i18nKey={'auth.createNewPasswordSuccess'}
						/>
						<Button
							label={'common.continue'}
							onPress={onCreateSuccessConfirm}
							className={'bg-purple-400 shadow-purple-300/40'}
						/>
					</View>
				</View>
			</CustomModal>
		</DetailScreenLayout>
	)
}
