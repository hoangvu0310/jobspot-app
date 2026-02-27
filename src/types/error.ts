export const ErrorCodes = {
	SUCCESS: 'SUCCESS',
	VALIDATION_ERROR: 'VALIDATION_ERROR',
	UNAUTHORIZED: 'UNAUTHORIZED',
	FORBIDDEN: 'FORBIDDEN',
	NOT_FOUND: 'NOT_FOUND',
	INTERNAL_ERROR: 'INTERNAL_ERROR',
	BAD_REQUEST: 'BAD_REQUEST',
	INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
	EXISTED_USER: 'EXISTED_USER',
	ILLEGAL_ARGUMENT: 'ILLEGAL_ARGUMENT',
	ILLEGAL_FILE_TYPE: 'ILLEGAL_FILE_TYPE',
}

export abstract class AppError extends Error {
	protected constructor(resultMsg: string) {
		super(resultMsg)
		this.resultMsg = resultMsg
	}

	public resultMsg: string
}

export class UnknownError extends AppError {
	constructor(originalErrorMsg: string) {
		super('Đã có lỗi xảy ra, vui lòng thử lại sau')
		this.originalErrorMsg = originalErrorMsg
	}

	public originalErrorMsg: string
}

export class NetworkError extends AppError {
	constructor() {
		super('Không có kết nối mạng. Vui lòng kiểm tra lại')
	}
}

export class ServerError extends AppError {
	constructor() {
		super('Không thể kết nối đến máy chủ, vui lòng thử lại sau')
	}
}

export class ApiError extends AppError {
	constructor(errorCode: string, resultMsg: string) {
		super(resultMsg)
		this.errorCode = errorCode
	}

	public errorCode: string
}
