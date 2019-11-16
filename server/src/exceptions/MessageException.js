class MessageException {

    static NOT_FOUND = "NOT_FOUND";
    static NAME_FARM_EXIST = "NAME_FARM_EXIST";
    static NAME_BATCH_EXIST = "NAME_BATCH_EXIST";
    static EMAIL_PEOPLE_EXIST = "EMAIL_PEOPLE_EXIST";

    static PARAM_DYNAMIC_MESSAGE = ":param";

    static messages = {
        "NAME_FARM_EXIST": "Already exist farm with name",
        "NOT_FOUND": "Not found :param!",
        "EMAIL_PEOPLE_EXIST": "Email already used other people.",
        "NAME_BATCH_EXIST": "Already exist batch with name"
    }

    static getByCode(code, param = null) {
        const message = MessageException.messages[code] || "";
        if (param) {
            return message.replace(MessageException.PARAM_DYNAMIC_MESSAGE, param);
        }

        return message;
    }
}

module.exports = MessageException;