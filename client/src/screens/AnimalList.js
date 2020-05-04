import React, { Component } from "react";
import { Col, SimpleTable, Box, Button } from "adminlte-2-react";
import { ToastContainer } from "react-toastr";
import Container from "./../components/template/Container";
import Animal from "../service/Animal";
import NotFound from "../components/NotFound";
import CONSTANTES from "../constantes/App";

export default class AnimalList extends Component {

    constructor(props) {
        super(props);
        let container;
        this.state = {
            animals: []
        };
        this.animalService = new Animal();
        this.removeItem = this.removeItem.bind(this);
    }

    async findAnimais() {
        const animals = await this.animalService.findAll();
        this.setState({ animals });
    }

    async removeItem(id) {
        try {
            await this.animalService.remove(id);
            await this.findAnimais();
            this.container.error(CONSTANTES.MESSAGE.DELETE, null, CONSTANTES.OPTIONS_TOASTR);
        } catch (error) {
            this.container.error(error.response.data.message, null, CONSTANTES.OPTIONS_TOASTR);
        }
    }

    isExistAnimals() {
        return this.state.animals.length > 0;
    }

    async componentDidMount() {
        await this.findAnimais();
    }

    render() {
        return (
            <Container title="Animal" subTitle="Lista de animais" >
                <ToastContainer ref={ref => this.container = ref} className="toast-top-right" />
                <Col lg={12}>
                    <Button type="primary" text="Nova animal" to="/animais/novo" />
                </Col>
                <br />
                <br />
                <Col lg={12}>
                    <Box border title="" noPadding>
                        {!this.isExistAnimals() && <NotFound />}
                        {this.isExistAnimals() &&
                            <table className="table table-bordered text-center" >
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Nome</th>
                                        <th>Especie</th>
                                        <th>Peso</th>
                                        <th>Sexo</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.animals.map(animal => (
                                            <tr key={animal.id}>
                                                <td>{animal.id}</td>
                                                <td>{animal.name}</td>
                                                <td>{animal.species}</td>
                                                <td>{animal.weight}</td>
                                                <td>{animal.sex}</td>
                                                <td>
                                                    <Button type="warning" icon="fa-pen"
                                                        to={`/animais/${animal.id}/editar`} />
                                                    &nbsp;
                                              <Button type="danger" icon="fa-trash"
                                                        onClick={() => this.removeItem(animal.id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        }

                    </Box>
                </Col>
            </Container>
        );
    }
}