const IRanchoException = require("./IRanchoException");

class LogicNegociationException extends IRanchoException {

    constructor(message, code) {
        super(message, code);
        this.name = "NotFoundException";
    }
}

module.exports = LogicNegociationException;