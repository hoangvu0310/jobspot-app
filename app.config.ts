import type { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
	return {
		...config,
		name: 'Jobspot',
		slug: 'jobspot-app',
		description: 'Jobspot App',
		version: '1.0.0',
		orientation: 'default',
		icon: './assets/icons/app/icon.png',
		scheme: 'jobspot-app',
		userInterfaceStyle: 'automatic',
		newArchEnabled: true,

		ios: {
			supportsTablet: true,
			config: {
				usesNonExemptEncryption: false,
			},
		},

		android: {
			adaptiveIcon: {
				foregroundImage: './assets/app/adaptive-icon.png',
			},
		},

		web: {
			bundler: 'metro',
			output: 'static',
			favicon: './assets/app/favicon.png',
		},

		plugins: [
			'expo-router',
			'expo-font',
			'expo-secure-store',
			[
				'expo-splash-screen',
				{
					backgroundColor: '#ffffff',
					image: './assets/app/splash-icon.png',
					dark: {
						backgroundImage: './assets/app/splash-icon.png',
						backgroundColor: '#ffffff',
					},
					resizeMode: 'contain',
					imageWidth: 200,
				},
			],
		],

		experiments: {
			typedRoutes: true,
		},
	}
}
