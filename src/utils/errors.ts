export class ApiError extends Error {
  public status: number
  public errorCode: string
  public type: string

  constructor (errorCode?: string, message?: string) {
    super(message)

    this.name = "APIError"
    this.message = message || "API error"
    this.errorCode = errorCode || "999"
    this.status = 400
    this.type = "API_ERROR"
  }

  public toJSON () {
    return {
      errorCode: this.errorCode,
      message: this.message,
      name: this.name,
      status: this.status,
      stack: this.stack
    }
  }
}

export class ServerValidationError extends ApiError {
  constructor (errorCode?: string, message?: string, type?: string, errors?: any) {
    super(...arguments)

    this.name = "ValidationError"
    this.message = message || "Ошибка при валидации данных."
    this.errorCode = errorCode
    this.status = 400
    this.stack = errors
    this.type = type || "DATA_FORMAT_INVALID"
  }
}

export class NotFoundError extends ApiError {
  constructor (errorCode?: string, message?: string, type?: string) {
    super(...arguments)

    this.name = "NotFoundError"
    this.message = message || "Ресурс не найден."
    this.status = 404
    this.errorCode = errorCode
    this.type = type
  }
}

export class AuthenticationError extends ApiError {
  constructor (errorCode?: string, message?: string, type?: string) {
    super(...arguments)

    this.name = "AuthenticationError"
    this.message = message || "Ошибка аутентификации"
    this.status = 401
    this.errorCode = errorCode
    this.type = type
  }
}