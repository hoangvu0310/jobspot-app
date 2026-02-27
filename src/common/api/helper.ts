import { AxiosError } from 'axios'
import type { ApiResult } from '@/types/result'
import { ApiError, NetworkError, ServerError, UnknownError } from '@/types/error'

export function handleError(error: unknown): void {
	if (error instanceof AxiosError) {
		if (error.code === AxiosError.ERR_NETWORK) {
			throw new NetworkError()
		}

		if (error.response) {
			if (error.response.status === 401) {
				// TODO: refresh token and retry
			}

			if (error.response.data) {
				const resultMsg = error.response.data.resultMsg
				const resultCode = error.response.data.resultCode

				throw new ApiError(resultMsg, resultCode)
			}
		}

		if (error.request) {
			throw new ServerError()
		}
	} else if (error instanceof Error) {
		throw new UnknownError(error.message)
	}
}

export async function runAsynchronousCall<T>(request: () => Promise<ApiResult<T>>): Promise<T | null> {
	try {
		const startTime = Date.now()
		const response = await request()
		console.log('Call took ' + (Date.now() - startTime) + ' milliseconds')
		return response.data || null
	} catch (error) {
		console.log(error)
		handleError(error)
	}

	return null
}
