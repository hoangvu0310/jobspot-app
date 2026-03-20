import { Stack } from 'expo-router'

export default function ResetPasswordLayout() {
	return (
		<Stack>
			<Stack.Screen name={'forgot-password'} options={{ headerShown: false }} />
			<Stack.Screen name={'otp'} options={{ headerShown: false }} />
			<Stack.Screen name={'new-password'} options={{ headerShown: false }} />
		</Stack>
	)
}
