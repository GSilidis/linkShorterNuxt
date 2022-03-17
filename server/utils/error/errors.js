class BadRequestError extends Error {
    /**
     * @constructor
     * @param message Message for user with problem
     */
    constructor (message) {
        super();

        this.code = 400;
        this.message = message || 'Bad request';
    }
}

class NotFoundError extends Error {
    /**
     * @constructor
     * @param message Message for user
     */
    constructor (message) {
        super();

        this.code = 404;
        this.message = message || 'Not found';
    }
}

class InternalServerError extends Error {
    /**
     * @constructor
     * @param message Message for user
     */
    constructor (message) {
        super();

        this.code = 500;
        this.message = message || 'Something weird happened';
    }
}

module.exports = { BadRequestError, NotFoundError, InternalServerError };
