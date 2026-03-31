import { DetailScreenLayout } from '@/components/layout'
import PagerView from 'react-native-pager-view'
import { useRouter } from 'expo-router'
import { ProfileSetupStepper } from '@/components/screen/profile/ProfileSetupStepper'
import { useRef, useState } from 'react'
import { Keyboard, type NativeSyntheticEvent, Pressable, View } from 'react-native'
import { Button } from '@/components/common'
import { PersonInfoForm } from '@/components/screen/profile/PersonInfoForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/common/utils/classname'
import { EducationInfoForm } from '@/components/screen/profile/EducationInfoForm'
import { createEducationItem, type ProfileForm, profileSchema } from '@/types/profile'

const TOTAL_STEP = 4

export default function SetupProfileScreen() {
	const router = useRouter()
	const pagerRef = useRef<PagerView>(null)
	const [currentStep, setCurrentStep] = useState(0)

	const profileForm = useForm<ProfileForm>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: undefined,
			phoneNumber: undefined,
			address: undefined,
			description: undefined,
			educationInfoList: [createEducationItem(0)],
		},
	})

	const onBackPress = () => {
		if (currentStep === 0) {
			router.back()
			return
		}

		pagerRef.current?.setPage(currentStep - 1)
	}

	const onPageSelected = (
		e: NativeSyntheticEvent<
			Readonly<{
				position: number
			}>
		>,
	) => {
		setCurrentStep(e.nativeEvent.position)
	}

	const toNextStep = () => {
		if (currentStep === TOTAL_STEP - 1) return

		pagerRef.current?.setPage(currentStep + 1)
	}

	return (
		<Pressable className={'flex-1'} onPress={Keyboard.dismiss}>
			<DetailScreenLayout
				onBack={onBackPress}
				titleKey={'profileSetup.setupYourProfile'}
				containerClassName={cn('gap-6')}
			>
				<ProfileSetupStepper step={currentStep} totalStep={TOTAL_STEP} />

				<PagerView
					ref={pagerRef}
					style={{ flex: 1, marginTop: 40 }}
					scrollEnabled={false}
					onPageSelected={onPageSelected}
				>
					<View key={'0'} className={'flex-1'}>
						<PersonInfoForm toNextStep={toNextStep} profileForm={profileForm} />
					</View>
					<View key={'1'} className={'flex-1'}>
						<EducationInfoForm toNextStep={toNextStep} profileForm={profileForm} />
					</View>
					<View key={'2'} className={'center-content flex-1'}>
						<Button label={'Next page: 3'} onPress={() => pagerRef.current?.setPage(currentStep + 1)} />
						<Button label={'Prev page: 1'} onPress={() => pagerRef.current?.setPage(currentStep - 1)} />
					</View>
					<View key={'3'} className={'center-content flex-1'}>
						<Button label={'Next page: end'} onPress={() => pagerRef.current?.setPage(currentStep + 1)} />
						<Button label={'Prev page: 2'} onPress={() => pagerRef.current?.setPage(currentStep - 1)} />
					</View>
				</PagerView>
			</DetailScreenLayout>
		</Pressable>
	)
}
