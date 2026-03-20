import '../global.css'
import '@/i18n'

import { Stack } from 'expo-router'
import { ThemeProvider } from '@/context'
import {
	JosefinSans_400Regular,
	JosefinSans_500Medium,
	JosefinSans_600SemiBold,
	JosefinSans_700Bold,
	useFonts,
} from '@expo-google-fonts/josefin-sans'
import { useEffect } from 'react'
import { preventAutoHideAsync, setOptions } from 'expo-splash-screen'
import { QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { queryClient } from '@/common/api'
import { StatusBar } from 'expo-status-bar'

setOptions({
	duration: 500,
	fade: true,
})

preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		JosefinSans_400Regular,
		JosefinSans_500Medium,
		JosefinSans_600SemiBold,
		JosefinSans_700Bold,
	})

	useEffect(() => {
		if (error) {
			console.error(error)
		}

		if (loaded) {
			console.log('Fonts loaded')
		}
	}, [error, loaded])

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView>
				<KeyboardProvider>
					<QueryClientProvider client={queryClient}>
						<ThemeProvider>
							<SafeAreaProvider>
								<Stack>
									<Stack.Screen name={'index'} options={{ headerShown: false }} />
									<Stack.Screen name={'(auth)'} options={{ headerShown: false }} />
									<Stack.Screen name={'(profile-setup)'} options={{ headerShown: false }} />
								</Stack>
							</SafeAreaProvider>
							<StatusBar style={'auto'} animated={true} />
						</ThemeProvider>
					</QueryClientProvider>
				</KeyboardProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}
