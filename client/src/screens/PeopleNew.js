import React, { Component } from "react";
import { Col, SimpleTable, Box, Button } from "adminlte-2-react";
import { ToastContainer } from "react-toastr";
import Container from "./../components/template/Container";
import Input from "./../components/form/Input";
import "./../toastr.min.css";
import "./../animate.min.css";
import ValidationRule from "../constantes/ValidationRule";
import FormValidation from "../utils/FormValidation";
import People from "../service/People";
import CONSTANTES from "../constantes/App";


export default class PeopleNew extends FormValidation {

    constructor(props) {
        super(props, ValidationRule.FORM.PEOPLE);
        let container;
        this.state = {
            name: '',
            email: '',
            endereco: '',
            sexo: '',
            errors: {
                name: { message: null },
                email: { message: null },
                endereco: { message: null },
                sexo: { message: null }
            }
        };
        this._peopleService = new People();
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
            email: '',
            endereco: '',
            sexo: ''
        });
    }

    async save(datas) {
        await this._peopleService.save(datas);
        this.container.success(CONSTANTES.MESSAGE.SAVE, null, CONSTANTES.OPTIONS_TOASTR);
        this.cleanForm();
    }

    async update(datas) {
        await this._peopleService.update(this.props.match.params.id, datas)
        this.container.success(CONSTANTES.MESSAGE.EDIT, null, CONSTANTES.OPTIONS_TOASTR);
        setTimeout(() => this.props.history.push("/pessoas"), 1000)
    }

    async submit() {
        try {
            const datas = {
                name: this.state.name,
                email: this.state.email,
                sex: this.state.sexo,
                address: this.state.endereco
            };
            const isUpdateRegister = this.props.match.params.id;
            if (isUpdateRegister) {
                await this.update(datas);
                return;
            }
            await this.save(datas);
        } catch (error) {
            this.container.error(error.response.data.message, null, CONSTANTES.OPTIONS_TOASTR);
        }
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            const people = await this._peopleService.findById(this.props.match.params.id);
            this.setState({
                name: people.name,
                email: people.email,
                endereco: people.address,
                sexo: people.sex
            });
        }
        this.validateFields();
    }

    render() {
        return (
            <Container title="Pessoa" subTitle="Lista de pessoas" >
                <ToastContainer ref={ref => this.container = ref} className="toast-top-right" />
                <Col lg={12}>
                    <Button disabled={!this.isFormValid()} type="primary"
                        text="Salvar" icon="fa-save" onClick={this.submit} />&nbsp;
                    <Button type="danger" text="Cancelar" icon="fa-times" to="/pessoas" />
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

                            <Input fieldName="email" label="Email" value={this.state.email}
                                isExistErrorMessage={this.isExistErroMessage}
                                handlerValue={this.handlerValue}
                                message={this.state.errors["email"]["message"]}
                            />


                            <Input fieldName="endereco" label="Endereço"
                                value={this.state.endereco}
                                isExistErrorMessage={this.isExistErroMessage}
                                handlerValue={this.handlerValue}
                                message={this.state.errors["endereco"]["message"]}
                            />

                            <div className="form-group">
                                <label>Sexo:</label>

                                <select className="form-control"
                                    onChange={(event) => this.handlerValue("sexo", event.target.value)}
                                    value={this.state.sexo} >
                                    <option value="">Selecionar um opção</option>
                                    <option value="F">Fêmea</option>
                                    <option value="M">Macho</option>
                                </select>
                                {this.isExistErroMessage("sexo") &&
                                    <span className="text-danger">{this.state.errors["sexo"]["message"]}</span>
                                }
                            </div>
                        </form>
                    </Box>

                </Col>
            </Container>
        );
    }
}