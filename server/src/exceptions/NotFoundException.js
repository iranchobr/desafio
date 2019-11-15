const IRanchoException = require("./IRanchoException");

class NotFoundException extends IRanchoException {

    constructor(message, code) {
        super(message, code);
        this.name = "LogicNegociationException";
    }
}

module.exports = NotFoundException;