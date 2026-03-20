import { Stack } from 'expo-router'

export default function ProfileSetupLayout() {
	return (
		<Stack>
			<Stack.Screen name={'index'} options={{ headerShown: false }} />
		</Stack>
	)
}
