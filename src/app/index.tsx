import { StatusBar } from 'expo-status-bar'
import { Button, Text, View } from 'react-native'
import { useTheme } from '@/context'

export default function App() {
	const { setTheme } = useTheme()

	return (
		<View className="flex-1 items-center justify-center bg-white px-8 dark:bg-black">
			{/* Heading */}
			<Text className="mb-3 text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white">🚀 Welcome</Text>

			{/* Subheading */}
			<Text className="mb-8 text-center text-xl leading-relaxed text-gray-700 dark:text-white">
				Build beautiful apps with <Text className="font-semibold text-blue-500">Expo (Router) + Uniwind 🔥</Text>
			</Text>

			{/* Instruction text */}
			<Text className="max-w-sm text-center text-base text-gray-600 dark:text-white">
				Start customizing your app by editing{' '}
				<Text className="font-semibold text-gray-800 dark:text-white">app/index.tsx</Text>
			</Text>

			<Button title={'Dark Theme'} onPress={() => setTheme('dark')} />
			<Button title={'Light Theme'} onPress={() => setTheme('light')} />
			<Button title={'System Theme'} onPress={() => setTheme('system')} />

			<StatusBar style="dark" />
		</View>
	)
}
