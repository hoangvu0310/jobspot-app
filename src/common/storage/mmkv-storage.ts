import { createMMKV } from 'react-native-mmkv'

export const SettingKeys = {
	LANGUAGE: 'language',
	THEME: 'theme',
}

const mmkvStorage = createMMKV({
	id: 'jobspot-app-storage',
	encryptionKey: 'jobspot-app',
	mode: 'multi-process',
	path: undefined,
	readOnly: false,
})

export function getMMKVItem(key: string): string | undefined {
	return mmkvStorage.getString(key)
}

export function setMMKVItem({ key, value }: { key: string; value: string }): boolean {
	try {
		mmkvStorage.set(key, value)
		return true
	} catch (err) {
		console.error('Error set item using RN MMKV', err)
		return false
	}
}

export function removeItem(key: string): boolean {
	return mmkvStorage.remove(key)
}

export function clearMMKVStorage(): void {
	mmkvStorage.clearAll()
}
