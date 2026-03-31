import { SafeAreaLayout } from '@/components/layout/SafeAreaLayout'
import { View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Asset } from '@/components/common/Asset'
import { cn } from '@/common/utils/classname'
import { ICONS } from '@/common/constants'
import { Typography } from '@/components/common'

type DetailScreenLayoutProps = {
	titleKey?: string
	canGoBack?: boolean
	children: React.ReactNode
	containerClassName?: string
	onBack?: () => void
}

export const DetailScreenLayout = ({
	titleKey,
	canGoBack = true,
	children,
	containerClassName,
	onBack,
}: DetailScreenLayoutProps) => {
	const router = useRouter()

	const handleBack = () => {
		if (onBack) {
			onBack()
			return
		}

		router.back()
	}

	return (
		<SafeAreaLayout className={'px-4'}>
			<View className={cn('flex-1', containerClassName)}>
				<View className={'flex-row items-center justify-start gap-4 py-3'}>
					{canGoBack && (
						<Asset
							source={ICONS.ArrowLeft}
							size={28}
							tintColorClassName={cn('accent-base-black')}
							onPress={handleBack}
						/>
					)}
					{titleKey && <Typography variant={'navHeader'} weight={'bold'} i18nKey={titleKey} />}
				</View>
				<View className={'flex-1'}>{children}</View>
			</View>
		</SafeAreaLayout>
	)
}
