import React, { Component } from "react";
import { Col, SimpleTable, Box, Button } from "adminlte-2-react";
import { ToastContainer } from "react-toastr";
import Container from "./../components/template/Container";
import Input from "./../components/form/Input";
import ValidationRule from "../constantes/ValidationRule";
import FormValidation from "../utils/FormValidation";
import Batch from "../service/Batch";
import Animal from "../service/Animal";
import Item from "../components/Item";
import CONSTANTES from "../constantes/App";


export default class BatchNew extends FormValidation {

    constructor(props) {
        super(props, ValidationRule.FORM.BATCH, ["animals", "animalsSelected"]);
        let container;
        this.state = {
            description: "",
            date_output: "",
            date_input: "",
            date_last_movimentation: "",
            name: '',
            animals: [],
            animalsSelected: [],
            errors: {
                name: { message: null },
                description: { message: null },
                date_output: { message: null },
                date_input: { message: null },
                date_last_movimentation: { message: null },
            }
        };
        this._animalService = new Animal();
        this._batchService = new Batch();
        this.handlerValue = this.handlerValue.bind(this);
        this.submit = this.submit.bind(this);
        this.removeAnimalSelected = this.removeAnimalSelected.bind(this);
        this.addAnimalListAnimalSelected = this.addAnimalListAnimalSelected.bind(this);
    }

    removeAnimalSelected(indice) {
        const animalsSelected = this.state.animalsSelected;
        animalsSelected.splice(indice, 1);
        this.setState({ animalsSelected });
        this.container.error("Animal removido com sucesso!", null, { closeButton: true });
    }

    checkAnimalAlreadyAddedListAnimalSelected(animal) {
        if (!animal) {
            return true;
        }
        const animalAlreadyAdded = this.state.animalsSelected.filter(item => item.id === animal.id);
        return animalAlreadyAdded.length > 0;
    }

    addAnimalListAnimalSelected(indiceArrayAnimal) {
        const animal = this.state.animals[indiceArrayAnimal];
        if (!this.checkAnimalAlreadyAddedListAnimalSelected(animal)) {
            this.setState({ animalsSelected: [...this.state.animalsSelected, animal] });
            this.container.success("Animal adicionado com sucesso!", null, { closeButton: true });
        }
    }

    handlerValue(field, value) {
        if (this.isEditionMode()) {
            this.setState({ [field]: value });
            return;
        }
        this.setState({ [field]: value }, this.validateFields);
    }

    cleanForm() {
        this.setState({
            description: "",
            date_output: "",
            date_input: "",
            date_last_movimentation: "",
            name: '',
            animalsSelected: []
        });
    }

    async save(datas) {
        await this._batchService.save(datas);
        this.container.success(CONSTANTES.MESSAGE.SAVE, null, CONSTANTES.OPTIONS_TOASTR);
        this.cleanForm();
    }

    async update(datas) {
        await this._batchService.update(this.props.match.params.id, datas)
        this.container.success(CONSTANTES.MESSAGE.EDIT, null, CONSTANTES.OPTIONS_TOASTR);
        setTimeout(() => this.props.history.push("/lotes"), 1000)
    }

    getDatasToPersist() {
        const datas = {
            name: this.state.name,
            description: this.state.description,
            batch_animal: []
        }

        datas.batch_animal = this.state.animalsSelected.map(animal => ({
            animal_id: animal.id,
            date_output: this.state.date_output,
            date_input: this.state.date_input,
            date_last_movimentation: this.state.date_last_movimentation
        }));

        return datas;
    }

    async submit() {
        try {
            const datas = this.getDatasToPersist();
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

    renderOptionsAnimal() {
        return this.state.animals.map((animal, indice) => (
            <option key={indice} value={indice}>{animal.name}</option>
        ));
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            const batch = await this._batchService.findById(this.props.match.params.id);
            this.setState({
                name: batch.name,
                description: batch.description,
            });
        } else {
            const animals = await this._animalService.findAll();
            this.setState({ animals });
            this.validateFields();
        }
    }

    render() {
        return (
            <Container title="Lotes" subTitle={ this.isEditionMode() ? "Editar lote": "Novo lote"} >
                <ToastContainer ref={ref => this.container = ref} className="toast-top-right" />
                <Col lg={12}>
                    <Button disabled={!this.isFormValid()} type="primary"
                        text="Salvar" icon="fa-save" onClick={this.submit} />&nbsp;
                    <Button type="danger" text="Cancelar" icon="fa-times" to="/lotes" />
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

                            <Input fieldName="description" label="Descrição"
                                value={this.state.description}
                                isExistErrorMessage={this.isExistErroMessage}
                                handlerValue={this.handlerValue}
                                message={this.state.errors["description"]["message"]}
                            />

                            {
                                !this.isEditionMode() &&
                                <Input fieldName="date_input" label="Data de entrada"
                                    type="date"
                                    value={this.state.date_input}
                                    isExistErrorMessage={this.isExistErroMessage}
                                    handlerValue={this.handlerValue}
                                    message={this.state.errors["date_input"]["message"]}
                                />
                            }

                            {
                                !this.isEditionMode() &&
                                <Input fieldName="date_output" label="Data de saída"
                                    type="date"
                                    value={this.state.date_input}
                                    isExistErrorMessage={this.isExistErroMessage}
                                    handlerValue={this.handlerValue}
                                    message={this.state.errors["date_output"]["message"]}
                                />
                            }

                            {
                                !this.isEditionMode() &&

                                <Input fieldName="date_last_movimentation" label="Data da última movimentação"
                                    type="date"
                                    value={this.state.date_input}
                                    isExistErrorMessage={this.isExistErroMessage}
                                    handlerValue={this.handlerValue}
                                    message={this.state.errors["date_last_movimentation"]["message"]}
                                />
                            }

                            {
                                !this.isEditionMode() &&
                                <div className="form-group">
                                    <label>Animais:</label>
                                    <select className="form-control"
                                        onChange={(event) => this.addAnimalListAnimalSelected(event.target.value)}
                                        value={this.state.farm_id} >
                                        <option value="">Selecionar um opção</option>
                                        {this.renderOptionsAnimal()}
                                    </select>
                                    {this.isExistErroMessage("farm_id") &&
                                        <span className="text-danger">{this.state.errors["farm_id"]["message"]}</span>
                                    }
                                </div>
                            }

                            {
                                this.state.animalsSelected.length > 0 &&
                                <div id="animals-selected">
                                    <h3 className="text-bold" style={{ "fontSize": "1em" }}>Animais selecionados:</h3>
                                    {
                                        this.state.animalsSelected.map((animal, indice) => (
                                            <Item
                                                text={animal.name}
                                                removeAction={() => this.removeAnimalSelected(indice)} />
                                        ))
                                    }
                                </div>
                            }


                        </form>
                    </Box>
                </Col>
            </Container>
        );
    }
}