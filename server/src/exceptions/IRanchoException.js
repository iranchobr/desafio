const MessageException = require("./MessageException");

class IRanchoException extends Error {

    constructor(message = "", param = null, code = 500) {
        super(MessageException.getByCode(message, param));
        this.name = 'IRanchoException';
        this.code = code;
    }
}

module.exports = IRanchoException;