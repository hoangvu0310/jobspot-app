import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { errorLogger, requestLogger, responseLogger } from 'axios-logger'
import { API_CONFIG } from '@/common/constants'
import { getSecureItem, SecureStorageKeys } from '@/common/storage'

const apiClient = axios.create({
	baseURL: API_CONFIG.API_URL + API_CONFIG.API_VERSION,
	timeout: 30000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

const loggerConfig = {
	dateFormat: 'HH:MM:ss',
	status: true,
	headers: true,
	data: true,
	prefixText: 'API',
	method: true,
	url: true,
}

apiClient.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		requestLogger(config, loggerConfig)

		const accessToken = await getSecureItem(SecureStorageKeys.ACCESS_TOKEN)
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	async (error) => {
		await errorLogger(error)
		return Promise.reject(error)
	},
)

apiClient.interceptors.response.use(
	(response) => {
		responseLogger(response, loggerConfig)
		return response
	},
	async (error: AxiosError) => {
		await errorLogger(error)
		if (error.response && error.response.status === 401) {
		}

		return Promise.reject(error)
	},
)

export default apiClient
