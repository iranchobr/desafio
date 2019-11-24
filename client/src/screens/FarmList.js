import React, { Component } from "react";
import { Col, SimpleTable, Box, Button } from "adminlte-2-react";
import { ToastContainer } from "react-toastr";
import Container from "./../components/template/Container";
import "./../toastr.min.css";
import "./../animate.min.css";
import Farm from "../service/Farm";
import NotFound from "../components/NotFound";
import CONSTANTES from "../constantes/App";

export default class FarmList extends Component {

    constructor(props) {
        super(props);
        let container;
        this.state = {
            farms: []
        };
        this._farmService = new Farm();
        this.removeItem = this.removeItem.bind(this);
    }

    async findFarms() {
        const farms = await this._farmService.findAll();
        this.setState({ farms });
    }

    async removeItem(id) {
        await this._farmService.remove(id);
        await this.findFarms();
        this.container.error(CONSTANTES.MESSAGE.DELETE, null, CONSTANTES.OPTIONS_TOASTR);
    }

    isExistFarms() {
        return this.state.farms.length > 0;
    }

    async componentDidMount() {
        await this.findFarms();
    }

    render() {
        return (
            <Container title="Fazenda" subTitle="Lista de fazendas" >
                <ToastContainer ref={ref => this.container = ref} className="toast-top-right" />
                <Col lg={12}>
                    <Button type="primary" text="Nova Fazenda" to="/fazendas/nova" />
                </Col>
                <br />
                <br />
                <Col lg={12}>
                    <Box border title="" noPadding>
                        { !this.isExistFarms() && <NotFound /> }
                        { this.isExistFarms() &&
                            <table className="table table-bordered text-center" >
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Nome</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.farms.map(farm => (
                                            <tr>
                                                <td>{farm.id}</td>
                                                <td>{farm.name}</td>
                                                <td>
                                                    <Button type="warning" icon="fa-pen"
                                                     to={`/fazendas/${farm.id}/editar`} />
                                                    &nbsp;
                                              <Button type="danger" icon="fa-trash"
                                                        onClick={() => this.removeItem(farm.id)}
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