import '../global.css'
import '@/i18n'

import { Slot } from 'expo-router'
import { ThemeProvider } from '@/context'

export default function Layout() {
	return (
		<ThemeProvider>
			<Slot />
		</ThemeProvider>
	)
}
