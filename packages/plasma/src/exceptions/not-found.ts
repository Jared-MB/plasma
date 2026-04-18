export class NotFoundException extends Error {

    status: number
    message: string

    constructor(message: string) {
        super(message)
        this.status = 404
        this.message = message

        Object.defineProperty(this, 'name', {
            value: 'NotFoundException'
        })

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundException)
        }
    }
}