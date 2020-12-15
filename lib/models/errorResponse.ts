import { timeStamp } from 'console';

/**
 * Presents an error response which would be sent to the user
 */
export class ErrorResponse {
    message: string;
    details: string;

    constructor(errorMessage: string, errorDetails: string) {
        this.message = errorMessage;
        this.details = errorDetails;
    }
}
