import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { getMMKVItem, setMMKVItem, SettingKeys } from '@/common/storage'
import { Uniwind } from 'uniwind'

type ThemeMode = 'light' | 'dark' | 'system'

type ThemeContextType = {
	theme: ThemeMode
	resolvedTheme: 'light' | 'dark'
	setTheme: (theme: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const systemScheme = useColorScheme()

	const [theme, setThemeState] = useState<ThemeMode>('system')

	// resolved theme
	const resolvedTheme: 'light' | 'dark' = theme === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : theme

	// load theme from storage
	useEffect(() => {
		const saved = getMMKVItem(SettingKeys.THEME)
		if (saved) {
			setThemeState(saved as ThemeMode)
		}
	}, [])

	const setTheme = (newTheme: ThemeMode) => {
		setThemeState(newTheme)
		setMMKVItem({ key: SettingKeys.THEME, value: newTheme })
		Uniwind.setTheme(newTheme)
	}

	const value = useMemo(
		() => ({
			theme,
			resolvedTheme,
			setTheme,
		}),
		[theme, resolvedTheme],
	)

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
	const ctx = useContext(ThemeContext)
	if (!ctx) {
		throw new Error('useTheme must be used inside ThemeProvider')
	}
	return ctx
}
