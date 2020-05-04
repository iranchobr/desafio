const IRanchoException = require("./IRanchoException");

class LogicNegociationException extends IRanchoException {

    constructor(message, param = null, code) {
        super(message, param, code);
        this.name = "NotFoundException";
    }
}

module.exports = LogicNegociationException;