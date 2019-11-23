import React, { Component } from "react";
import Validator from "../service/Validator";
import ValidationRule from "../constantes/ValidationRule";

export default class FormValidation extends Component {

    constructor(props, ruleValidation) {
        super(props);
        this._validator = new Validator(ruleValidation);
        this.isFormValid = this.isFormValid.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.isExistErroMessage = this.isExistErroMessage.bind(this);
    }

    isFormValid() {
        const errors = Object.keys(this.state.errors);
        return errors.filter(field => this.state.errors[field]["message"] != null).length == 0;
    }

    validateFields() {
        const fields = this.state;
        delete fields.errors;
        const errors = this._validator.isValid(fields);
        this.setState({ errors });
    }

    isExistErroMessage(field) {
        if (!this.state.errors[field]) {
            return false;
        }

        if (!this.state.errors[field]["message"]) {
            return false;
        } else {
            return true
        }
    }

}