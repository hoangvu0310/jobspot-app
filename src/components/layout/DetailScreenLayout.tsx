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
}

export const DetailScreenLayout = ({
	titleKey,
	canGoBack = true,
	children,
	containerClassName,
}: DetailScreenLayoutProps) => {
	const router = useRouter()

	return (
		<SafeAreaLayout className={'px-4'}>
			<View className={cn('flex-1', containerClassName)}>
				<View className={'flex-row items-center justify-start gap-4 py-3'}>
					{canGoBack && (
						<Asset
							source={ICONS.ArrowLeft}
							size={28}
							tintColorClassName={cn('accent-base-black')}
							onPress={() => router.back()}
						/>
					)}
					{titleKey && <Typography variant={'navHeader'} weight={'bold'} i18nKey={titleKey} />}
				</View>
				<View className={'flex-1'}>{children}</View>
			</View>
		</SafeAreaLayout>
	)
}
