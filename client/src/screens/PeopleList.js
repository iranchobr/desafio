import React, { Component } from "react";
import { Col, SimpleTable, Box, Button } from "adminlte-2-react";
import { ToastContainer } from "react-toastr";
import Container from "./../components/template/Container";
import "./../toastr.min.css";
import "./../animate.min.css";
import People from "../service/People";
import NotFound from "../components/NotFound";
import CONSTANTES from "../constantes/App";

export default class PeopleList extends Component {

    constructor(props) {
        super(props);
        let container;
        this.state = {
            peoples: []
        };
        this._peopleService = new People();
        this.removeItem = this.removeItem.bind(this);
    }

    async findPeoples() {
        const peoples = await this._peopleService.findAll();
        this.setState({ peoples: peoples });
    }

    async removeItem(id) {
        await this._peopleService.remove(id);
        await this.findPeoples();
        this.container.error(CONSTANTES.MESSAGE.DELETE, null, CONSTANTES.OPTIONS_TOASTR);
    }

    isExistPeoples() {
        return this.state.peoples.length > 0;
    }

    async componentDidMount() {
        await this.findPeoples();
    }

    render() {
        return (
            <Container title="Pessoa" subTitle="Lista de pessoas" >
                <ToastContainer ref={ref => this.container = ref} className="toast-top-right" />
                <Col lg={12}>
                    <Button type="primary" text="Nova pessoa" to="/pessoas/nova" />
                </Col>
                <br />
                <br />
                <Col lg={12}>
                    <Box border title="" noPadding>
                        { !this.isExistPeoples() && <NotFound /> }
                        { this.isExistPeoples() &&
                            <table className="table table-bordered text-center" >
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Endereço</th>
                                        <th>Sexo</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.peoples.map(people => (
                                            <tr>
                                                <td>{people.id}</td>
                                                <td>{people.name}</td>
                                                <td>{people.email}</td>
                                                <td>{people.address}</td>
                                                <td>{people.sex}</td>
                                                <td>
                                                    <Button type="warning" icon="fa-pen"
                                                     to={`/pessoas/${people.id}/editar`} />
                                                    &nbsp;
                                              <Button type="danger" icon="fa-trash"
                                                        onClick={() => this.removeItem(people.id)}
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