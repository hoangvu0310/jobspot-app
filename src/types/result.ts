export type ApiResult<T> = {
	data?: T
	resultCode: string
	resultMessage: string
	timestamp: string
}

export type PaginatedResult<T> = {
	content: T[]
	page: number
	size: number
	totalElements: number
	totalPages: number
}
