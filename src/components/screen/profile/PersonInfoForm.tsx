import { View } from 'react-native'
import { ProfileFormTitle } from '@/components/screen/profile/ProfileFormTitle'
import { Button, Input, PressableWrapper, Typography } from '@/components/common'
import { ICONS } from '@/common/constants'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { cn } from '@/common/utils/classname'
import type { ProfileForm } from '@/types/profile'

type PersonInfoFormProps = {
	toNextStep: () => void
	profileForm: UseFormReturn<ProfileForm>
}

export const PersonInfoForm = ({ toNextStep, profileForm }: PersonInfoFormProps) => {
	const { t } = useTranslation()

	const saveAndContinue = () => {
		toNextStep()
		profileForm.resetField('name')
		profileForm.resetField('phoneNumber')
		profileForm.resetField('address')
		profileForm.resetField('description')
	}

	return (
		<KeyboardAwareScrollView
			showsVerticalScrollIndicator={false}
			bottomOffset={20}
			keyboardShouldPersistTaps={'handled'}
			contentContainerClassName={'px-0.5'}
		>
			<View className={'flex-1 justify-start gap-4'}>
				<ProfileFormTitle titleKey={'profileSetup.personInfo.personalInfo'} />
				<View className={'gap-6'}>
					<Controller
						control={profileForm.control}
						name={'name'}
						render={({ field: { value, onChange } }) => (
							<Input
								leftIconSource={ICONS.User}
								placeholder={t('profileSetup.personInfo.name')}
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>

					<Controller
						control={profileForm.control}
						name={'phoneNumber'}
						render={({ field: { value, onChange } }) => (
							<Input
								leftIconSource={ICONS.Phone}
								placeholder={t('profileSetup.personInfo.phoneNumber')}
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>

					<Input editable={false} leftIconSource={ICONS.Mail} placeholder={t('profileSetup.personInfo.emailAddress')} />

					<Controller
						control={profileForm.control}
						name={'address'}
						render={({ field: { value, onChange } }) => (
							<Input
								leftIconSource={ICONS.Address}
								placeholder={t('profileSetup.personInfo.address')}
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>

					<Controller
						control={profileForm.control}
						name={'description'}
						render={({ field: { value, onChange } }) => (
							<Input
								leftIconSource={ICONS.User}
								placeholder={t('profileSetup.personInfo.description')}
								multiline={true}
								textAlignVertical={'top'}
								value={value}
								onChangeText={onChange}
								inputViewClassName={cn('h-30 items-start')}
							/>
						)}
					/>
				</View>

				<View className={'center-content gap-8 px-4'}>
					<Button label={'common.saveAndContinue'} onPress={toNextStep} className={'w-full'} />
					<PressableWrapper onPress={saveAndContinue}>
						<Typography
							variant={'bodyXXL'}
							weight={'semibold'}
							i18nKey={'profileSetup.skipForNow'}
							className={'text-purple-400'}
						/>
					</PressableWrapper>
				</View>
			</View>
		</KeyboardAwareScrollView>
	)
}
