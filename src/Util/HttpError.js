'use strict';

module.exports = class HttpError extends Error {

    constructor(message, code, internal) {
        super(message, code);
        this.code = code;

        let error = {
            'code': this.code,
            'detail': message
        };

        return {
            'errors': [error]
        };
    }

}

