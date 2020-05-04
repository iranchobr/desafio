import validator from 'validator';

export default class Validator {

    constructor(validationRules = []) {
        this._validationRules = validationRules;
    }

    isValid(datas) {
        const errors = {};
        this._validationRules.forEach(validationRule => {
            validationRule.rules.forEach((rule) => {
                errors[validationRule.field] = { message: null };
                if (this._isInvalid(rule, validationRule, datas)) {
                    errors[validationRule.field] = { message: rule.messageValidation };
                }
            });
        });
        return errors
    }

    _isInvalid(rule, validationRule, datas) {
        return validator[rule.validation]((datas[validationRule.field] || "").toString(), rule.options) != rule.valueExpected;
    }
}