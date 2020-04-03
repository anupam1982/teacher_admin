'use strict';

module.exports = class HttpError extends Error {

    constructor(message, code, internal) {
        super(message, code);
        this.internal = internal;
        this.code = code;
        this.name = 'HttpError';

        /**
         * Errors can't be extended normally in an es6 class
         *
         * @returns {{errors: *[]}}
         */
        this.render = () => {
            let error = {
                'code': this.internal,
                'status': this.code,
                'detail': message
            };

            if (process.env.NODE_ENV !== 'production') {
                error.trace = this.stack;
            }

            return {
                'errors': [error]
            };
        };
    }

}

