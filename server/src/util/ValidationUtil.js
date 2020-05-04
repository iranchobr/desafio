module.exports = {

    getMessages(errors) {
        return errors.map(validation => validation["message"]);
    }
}