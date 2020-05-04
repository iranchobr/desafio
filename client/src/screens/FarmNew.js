import React, { Component } from "react";
import { Col, SimpleTable, Box, Button } from "adminlte-2-react";
import { ToastContainer } from "react-toastr";
import Container from "./../components/template/Container";
import Input from "./../components/form/Input";
import ValidationRule from "../constantes/ValidationRule";
import FormValidation from "../utils/FormValidation";
import Farm from "../service/Farm";
import CONSTANTES from "../constantes/App";


export default class FarmNew extends FormValidation {

    constructor(props) {
        super(props, ValidationRule.FORM.FARM);
        let container;
        this.state = {
            name: '',
            errors: {
                name: { message: null },
            }
        };
        this._farmService = new Farm();
        this.handlerValue = this.handlerValue.bind(this);
        this.submit = this.submit.bind(this);
    }

    handlerValue(field, value) {
        this.setState({ [field]: value });
        this.validateFields();
    }

    cleanForm() {
        this.setState({
            name: '',
        });
    }

    async save(datas) {
        await this._farmService.save(datas);
        this.container.success(CONSTANTES.MESSAGE.SAVE, null, CONSTANTES.OPTIONS_TOASTR);
        this.cleanForm();
    }

    async update(datas) {
        await this._farmService.update(this.props.match.params.id, datas)
        this.container.success(CONSTANTES.MESSAGE.EDIT, null, CONSTANTES.OPTIONS_TOASTR);
        setTimeout(() => this.props.history.push("/fazendas"), 1000)
    }

    async submit() {
        try {
            const datas = {
                name: this.state.name,
            };
            const isUpdateRegister = this.props.match.params.id;
            if (isUpdateRegister) {
                await this.update(datas);
                return;
            }
            await this.save(datas);
            this.cleanForm();
        } catch (error) {
            this.container.error(error.response.data.message, null, CONSTANTES.OPTIONS_TOASTR);
        }
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            const people = await this._farmService.findById(this.props.match.params.id);
            this.setState({
                name: people.name,
            });
        }
        this.validateFields();
    }

    render() {
        return (
            <Container title="Fazendas" subTitle={ this.isEditionMode() ? "Editar fazenda" : "Nova fazenda"} >
                <ToastContainer ref={ref => this.container = ref} className="toast-top-right" />
                <Col lg={12}>
                    <Button disabled={!this.isFormValid()} type="primary"
                        text="Salvar" icon="fa-save" onClick={this.submit} />&nbsp;
                    <Button type="danger" text="Cancelar" icon="fa-times" to="/fazendas" />
                </Col>
                <br />
                <br />
                <Col lg={12}>
                    <Box border title="">
                        <form>
                            <Input fieldName="name" label="Nome" value={this.state.name}
                                isExistErrorMessage={this.isExistErroMessage}
                                handlerValue={this.handlerValue}
                                message={this.state.errors["name"]["message"]}
                            />
                        </form>
                    </Box>

                </Col>
            </Container>
        );
    }
}