import * as SecureStorage from 'expo-secure-store'

export const SecureStorageKeys = {
	ACCESS_TOKEN: 'access_token',
	REFRESH_TOKEN: 'refresh_token',
}

export async function getSecureItem(key: string): Promise<string | null> {
	return await SecureStorage.getItemAsync(key, {})
}

export async function setSecureItem({ key, value }: { key: string; value: string }): Promise<void> {
	await SecureStorage.setItemAsync(key, value)
}

export async function removeSecureItem(key: string): Promise<void> {
	await SecureStorage.deleteItemAsync(key)
}

export async function clearSecureStorage(): Promise<void> {
	await Promise.all([
		SecureStorage.deleteItemAsync(SecureStorageKeys.ACCESS_TOKEN),
		SecureStorage.deleteItemAsync(SecureStorageKeys.REFRESH_TOKEN),
	])
}
