import { useCallback, useEffect, useState } from 'react'
import { hideAsync } from 'expo-splash-screen'
import { type Href, Redirect } from 'expo-router'
import { clearSecureStorage, getSecureItem, SecureStorageKeys } from '@/common/storage'
import { jwtDecode } from 'jwt-decode'

export default function App() {
	const [ready, setReady] = useState<boolean>(false)
	const [route, setRoute] = useState<Href | null>(null)

	const preloadData = useCallback(async () => {
		const accessToken = await getSecureItem(SecureStorageKeys.ACCESS_TOKEN)
		if (!accessToken) {
			console.log('No access token found')
			setRoute('/(auth)/sign-in')
			return
		}

		try {
			const decoded = jwtDecode(accessToken)
			if (decoded.exp && Date.now() < decoded.exp * 1000) {
				console.log('Token is valid')
				setRoute('/(main)/home')

				// TODO: preload data
			} else {
				console.log('Token is expired')
				await clearSecureStorage()
				// TODO: refresh token
			}
		} catch (e) {
			console.error('Invalid token', e)
			setRoute('/(auth)/sign-in')
		}
	}, [])

	useEffect(() => {
		preloadData().then(() => setReady(true))

		if (ready) {
			hideAsync().then(() => console.log('Splash screen hide'))
			return
		}
		return
	}, [preloadData, ready])

	if (!ready) return null

	return <Redirect href={route || '/(auth)/sign-in'} />
}
