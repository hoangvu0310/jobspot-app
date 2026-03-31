import { PressableWrapper, Typography } from '@/components/common'
import { Keyboard, TextInput, View } from 'react-native'
import { useEffect, useRef } from 'react'
import { cn } from '@/common/utils/classname'

type OTPInputProps = {
	type?: '4-digit' | '6-digit'
	value: string
	onChange: (value: string) => void
}

export const OTPInput = ({ type = '4-digit', value, onChange }: OTPInputProps) => {
	const inputRef = useRef<TextInput>(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	return (
		<PressableWrapper onPress={() => inputRef.current?.focus()}>
			<View className={'flex-row gap-4'}>
				{Array.from({ length: type === '4-digit' ? 4 : 6 }).map((_, index, __) => (
					<View
						key={index}
						className={cn('aspect-square w-15 rounded-[7px] shadow-[0px_12px_20px_9px] shadow-base-black/4')}
					>
						<View
							className={cn('center-content h-full w-full rounded-[7px] p-2', {
								'shadow-[inset_0_0_0_1.5px] shadow-primary-600':
									value.length - 1 === index || (value.length === 0 && index === 0),
							})}
						>
							<Typography weight={'semibold'} className={'text-[22px] text-primary-600'}>
								{value.at(index)}
							</Typography>
						</View>
					</View>
				))}
			</View>
			<TextInput
				ref={inputRef}
				value={value}
				onChangeText={(text) => {
					let otp = text
					if (type === '4-digit') {
						if (otp.length > 4) {
							otp = otp.substring(0, 4)
						}

						if (otp.length === 4) {
							Keyboard.dismiss()
						}
					}

					if (type === '6-digit') {
						if (otp.length > 6) {
							otp = otp.substring(0, 6)
						}

						if (otp.length === 6) {
							Keyboard.dismiss()
						}
					}

					onChange(otp)
				}}
				keyboardType={'numeric'}
				textContentType={'oneTimeCode'}
				className={'absolute bottom-0 opacity-0'}
			/>
		</PressableWrapper>
	)
}
