import React, { Component } from "react";
import { Col, SimpleTable, Box, Button } from "adminlte-2-react";
import { ToastContainer } from "react-toastr";
import Container from "./../components/template/Container";
import Input from "./../components/form/Input";
import ValidationRule from "../constantes/ValidationRule";
import FormValidation from "../utils/FormValidation";
import People from "../service/People";
import CONSTANTES from "../constantes/App";
import Farm from "../service/Farm";
import Animal from "../service/Animal";


export default class AnimalNew extends FormValidation {

    constructor(props) {
        super(props, ValidationRule.FORM.ANIMAL, ["peoples", "farms"]);
        let container;
        this.state = {
            people_id: "",
            farm_id: "",
            name: "",
            species: "",
            sex: "",
            weight: "",
            date_birth: "",
            peoples: [],
            farms: [],
            errors: {
                people_id: { message: null },
                farm_id: { message: null },
                name: { message: null },
                species: { message: null },
                sex: { message: null },
                weight: { message: null },
                date_birth: { message: null }
            }
        };
        this._peopleService = new People();
        this._farmService = new Farm();
        this._animalService = new Animal();
        this.handlerValue = this.handlerValue.bind(this);
        this.submit = this.submit.bind(this);
    }

    handlerValue(field, value) {
        this.setState({ [field]: value }, this.validateFields);
    }

    cleanForm() {
        this.setState({
            people_id: "",
            farm_id: "",
            name: "",
            species: "",
            sex: "",
            weight: "",
            date_birth: ""
        });
    }

    async save(datas) {
        await this._animalService.save(datas);
        this.container.success(CONSTANTES.MESSAGE.SAVE, null, CONSTANTES.OPTIONS_TOASTR);
        this.cleanForm();
    }

    async update(datas) {
        await this._animalService.update(this.props.match.params.id, datas)
        this.container.success(CONSTANTES.MESSAGE.EDIT, null, CONSTANTES.OPTIONS_TOASTR);
        setTimeout(() => this.props.history.push("/animais"), 1000)
    }

    async submit() {
        try {
            const datas = {
                people_id: this.state.people_id,
                farm_id: this.state.farm_id,
                name: this.state.name,
                species: this.state.species,
                sex: this.state.sex,
                weight: this.state.weight,
                date_birth: this.state.date_birth
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

    renderOptionsFarm() {
        return this.state.farms.map((farm, indice) => (
            <option key={indice} value={farm.id}>{farm.name}</option>
        ));
    }

    renderOptionsPeople() {
        return this.state.peoples.map((people, indice) => (
            <option key={indice} value={people.id}>{people.name}</option>
        ));
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            const animal = await this._animalService.findById(this.props.match.params.id);
            this.setState({
                farm_id: animal.farm_id,
                people_id: animal.people_id,
                date_birth: animal.date_birth,
                name: animal.name,
                species: animal.species,
                weight: animal.weight,
                sex: animal.sex,
            });
        }

        const peoples = await this._peopleService.findAll(["id", "name"]);
        const farms = await this._farmService.findAll();
        this.setState({ peoples, farms }, this.validateFields)
    }

    render() {
        return (
            <Container title="Animais" subTitle={ this.isEditionMode() ? "Editar animal": "Novo animal"} >
                <ToastContainer ref={ref => this.container = ref} className="toast-top-right" />
                <Col lg={12}>
                    <Button disabled={!this.isFormValid()} type="primary"
                        text="Salvar" icon="fa-save" onClick={this.submit} />&nbsp;
                    <Button type="danger" text="Cancelar" icon="fa-times" to="/animais" />
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

                            <Input fieldName="species" label="Especies"
                                value={this.state.species}
                                isExistErrorMessage={this.isExistErroMessage}
                                handlerValue={this.handlerValue}
                                message={this.state.errors["species"]["message"]}
                            />


                            <Input fieldName="weight" label="Peso"
                                value={this.state.weight}
                                isExistErrorMessage={this.isExistErroMessage}
                                handlerValue={this.handlerValue}
                                message={this.state.errors["weight"]["message"]}
                            />


                            <Input fieldName="date_birth" label="Data de nascimento"
                                value={this.state.date_birth}
                                isExistErrorMessage={this.isExistErroMessage}
                                handlerValue={this.handlerValue}
                                type="date"
                                message={this.state.errors["date_birth"]["message"]}
                            />

                            <div className="form-group">
                                <label>Sexo:</label>

                                <select className="form-control"
                                    onChange={(event) => this.handlerValue("sex", event.target.value)}
                                    value={this.state.sexo} >
                                    <option value="">Selecionar um opção</option>
                                    <option value="F">Fêmea</option>
                                    <option value="M">Macho</option>
                                </select>
                                {this.isExistErroMessage("sex") &&
                                    <span className="text-danger">{this.state.errors["sex"]["message"]}</span>
                                }
                            </div>

                            <div className="form-group">
                                <label>Pessoas:</label>
                                <select className="form-control"
                                    onChange={(event) => this.handlerValue("people_id", event.target.value)}
                                    value={this.state.people_id} >
                                    <option value="">Selecionar um opção</option>
                                    {this.renderOptionsPeople()}
                                </select>
                                {this.isExistErroMessage("people_id") &&
                                    <span className="text-danger">{this.state.errors["people_id"]["message"]}</span>
                                }
                            </div>


                            <div className="form-group">
                                <label>Fazendas:</label>
                                <select className="form-control"
                                    onChange={(event) => this.handlerValue("farm_id", event.target.value)}
                                    value={this.state.farm_id} >
                                    <option value="">Selecionar um opção</option>
                                    {this.renderOptionsFarm()}
                                </select>
                                {this.isExistErroMessage("farm_id") &&
                                    <span className="text-danger">{this.state.errors["farm_id"]["message"]}</span>
                                }
                            </div>
                        </form>
                    </Box>

                </Col>
            </Container>
        );
    }
}