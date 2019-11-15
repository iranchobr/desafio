const IRanchoException = require("./IRanchoException");

class NotFoundException extends IRanchoException {

    constructor(message, param = null, code) {
        super(message, param, code);
        this.name = "LogicNegociationException";
    }
}

module.exports = NotFoundException;