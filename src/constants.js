export default {
    MESSAGES: {
        SUCCESS: {
            MESSAGE_SENT: 'Message sent successfully',
            SESSION_LOGIN: 'Admin session has logged-in successfully',
            MESSAGES_FETCHED: 'Messages fetched successfully',
            MESSAGE_FETCHED: 'Message fetched successfully',
            MARKED_ALL_AS_READ: 'All messages marked as read',
            MESSAGE_DELETED: 'Message deleted successfully',
            TEST_SUCCESS: 'Test successfull',
        },
        ERROR: {
            SOMETHING_WENT_WRONG: 'Something went wrong, please try again',
            MAX_MESSAGE_LIMIT: 'You have reached the maximum message limit',
            INVALID_SECRET: 'Invalid admin secret',
            TOKEN_IS_REQUIRED: 'Token is required',
            INVALID_TOKEN: 'Invalid token or signature',
            TOKEN_EXPIRED: 'Token has expired',
            MESSAGE_NOT_FOUND: 'Message not found for this messageId',
            EMAIL_NOT_VALID: 'Email is not valid',
        },
    },
    COLLECTIONS: {
        MESSAGE: 'Message',
        SESSION: 'Session',
    },
}
