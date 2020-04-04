'use strict';

module.exports = class HttpError extends Error {

    constructor(message, code, internal) {
        super(message, code);
        this.internal = internal;
        this.code = code;
        this.name = 'HttpError';

        let error = {
            'code': this.internal,
            'status': this.code,
            'detail': message
        };

        return {
            'errors': [error]
        };
    }

}

