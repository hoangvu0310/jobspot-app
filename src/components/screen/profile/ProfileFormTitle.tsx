import { View } from 'react-native'
import { Divider, Typography } from '@/components/common'
import { cn } from '@/common/utils/classname'

type ProfileFormTitleProps = {
	titleKey: string
	titleClassName?: string
	dividerClassName?: string
}

export const ProfileFormTitle = ({ titleKey, titleClassName, dividerClassName }: ProfileFormTitleProps) => {
	return (
		<View className={'justify-start gap-0.5'}>
			<Typography weight={'semibold'} className={cn('text-headline-s', titleClassName)} i18nKey={titleKey} />
			<Divider dividerClassName={dividerClassName} />
		</View>
	)
}
