class MessageException {

    static NOT_FOUND = "NOT_FOUND";
    static NAME_FARM_EXIST = "NAME_FARM_EXIST";
    static EMAIL_PEOPLE_EXIST = "EMAIL_PEOPLE_EXIST";

    static messages = {
        "NAME_FARM_EXIST": "Already exist farm with name",
        "NOT_FOUND": "Not found register!",
        "EMAIL_PEOPLE_EXIST": "Email already used other people."
    }

    static getByCode(code) {
        return MessageException.messages[code] || "";
    }
}

module.exports = MessageException;