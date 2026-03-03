import '../global.css'
import '@/i18n'

import { Slot } from 'expo-router'
import { ThemeProvider } from '@/context'
import {
	useFonts,
	JosefinSans_400Regular,
	JosefinSans_500Medium,
	JosefinSans_600SemiBold,
	JosefinSans_700Bold,
} from '@expo-google-fonts/josefin-sans'
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
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
			console.info('Fonts loaded')
			SplashScreen.hideAsync()
		}
	}, [error, loaded])

	return (
		<ThemeProvider>
			<Slot />
		</ThemeProvider>
	)
}
