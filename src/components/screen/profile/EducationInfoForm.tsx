import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { Text, View } from 'react-native'
import { ProfileFormTitle } from '@/components/screen/profile/ProfileFormTitle'
import { Controller, useFieldArray, type UseFormReturn } from 'react-hook-form'
import { Button, Input, PressableWrapper, Typography } from '@/components/common'
import { ICONS } from '@/common/constants'
import { createEducationItem, type ProfileForm } from '@/types/profile'
import { Asset } from '@/components/common/Asset'

type EducationInfoFormProps = {
	toNextStep: () => void
	profileForm: UseFormReturn<ProfileForm>
}

export const EducationInfoForm = ({ toNextStep, profileForm }: EducationInfoFormProps) => {
	const { t } = useTranslation()
	const { append, remove, fields } = useFieldArray({ control: profileForm.control, name: 'educationInfoList' })

	const addDetails = () => append(createEducationItem(fields.length))

	const saveAndContinue = () => {
		toNextStep()
		profileForm.resetField('educationInfoList')
	}

	return (
		<KeyboardAwareScrollView
			showsVerticalScrollIndicator={false}
			bottomOffset={20}
			keyboardShouldPersistTaps={'handled'}
			contentContainerClassName={'px-0.5'}
		>
			<View className={'flex-1 justify-start gap-4'}>
				<ProfileFormTitle titleKey={'profileSetup.eduInfo.education'} />
				<View className={'gap-6'}>
					{fields.map((item, index) => (
						<View key={item.id} className={'w-full gap-8 rounded-[15px] bg-primary-25 px-4 py-6'}>
							<View className={'flex-row items-center justify-between'}>
								<Typography
									variant={'bodyXL'}
									weight={'semibold'}
									className={'text-[22px] text-gray-300'}
									i18nKey={'profileSetup.eduInfo.enterDetails'}
								/>
								{fields.length > 1 && <Asset source={ICONS.Close} size={32} onPress={() => remove(index)} />}
							</View>

							<View className={'justify-center gap-6'}>
								<Controller
									control={profileForm.control}
									name={`educationInfoList.${index}.facility`}
									render={({ field: { value, onChange } }) => (
										<Input
											value={value}
											onChangeText={onChange}
											leftIconSource={ICONS.School}
											placeholder={t('profileSetup.eduInfo.eduFacility')}
										/>
									)}
								/>

								<Controller
									control={profileForm.control}
									name={`educationInfoList.${index}.major`}
									render={({ field: { value, onChange } }) => (
										<Input value={value} onChangeText={onChange} placeholder={t('profileSetup.eduInfo.major')} />
									)}
								/>

								<View className={'w-full flex-row gap-3'}>
									<Controller
										control={profileForm.control}
										name={`educationInfoList.${index}.startTime`}
										render={({ field: { value, onChange } }) => (
											<Input
												value={value}
												onChangeText={onChange}
												leftIconSource={ICONS.Calendar}
												placeholder={t('profileSetup.eduInfo.startTime')}
												containerClassName={'flex-1'}
											/>
										)}
									/>

									<Controller
										control={profileForm.control}
										name={`educationInfoList.${index}.endTime`}
										render={({ field: { value, onChange } }) => (
											<Input
												value={value}
												onChangeText={onChange}
												leftIconSource={ICONS.Calendar}
												placeholder={t('profileSetup.eduInfo.endTime')}
												containerClassName={'flex-1'}
											/>
										)}
									/>
								</View>

								<Text>{item.positionInList}</Text>
							</View>
						</View>
					))}
				</View>

				<View className={'center-content mt-2 gap-6 px-4'}>
					<PressableWrapper className={'flex-row gap-2'} onPress={addDetails}>
						<Asset source={ICONS.Add} size={32} />
						<Typography variant={'bodyXXL'} weight={'semibold'} i18nKey={'profileSetup.eduInfo.addDetails'} />
					</PressableWrapper>

					<Button label={'common.saveAndContinue'} onPress={toNextStep} className={'mb-2 w-full'} />

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
