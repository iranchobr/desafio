const validationUtil = require("../util/ValidationUtil");

module.exports = (error, request, response, next) => {
    console.log(error);
    switch (error.name) {
        case "LogicNegociationException":
            return response.status(error.code).json({
                "statusCode": error.code,
                "message": error.message
            });
        case "NotFoundException":
            return response.status(error.code).json({
                "statusCode": error.code,
                "message": error.message
            });
        case "SequelizeValidationError":
            return response.status(400).json({
                "statusCode": 400,
                "message": validationUtil.getMessages(error.errors)
            });
        default:
            return response.status(error.code).json({
                "statusCode": error.code,
                "message": error.message
            })
    }
}