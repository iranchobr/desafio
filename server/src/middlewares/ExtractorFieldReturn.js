module.exports = {
    extract(request, response, next) {
        let fields = request.query.fields;
        if (fields) {
            fields = fields.split(",");
            request.fieldsReturn = fields;
        } else {
            request.fieldsReturn = [];
        }

        next();
    }
}