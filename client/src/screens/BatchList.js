import React, { Component } from "react";
import { Col, SimpleTable, Box, Button } from "adminlte-2-react";
import { ToastContainer } from "react-toastr";
import Container from "./../components/template/Container";
import Batch from "../service/Batch";
import NotFound from "../components/NotFound";
import CONSTANTES from "../constantes/App";

export default class BatchList extends Component {

    constructor(props) {
        super(props);
        let container;
        this.state = {
            batchs: []
        };
        this.batchService = new Batch();
        this.removeItem = this.removeItem.bind(this);
    }

    async findBaths() {
        const batchs = await this.batchService.findAll();
        this.setState({ batchs });
    }

    async removeItem(id) {
        try {
            await this.batchService.remove(id);
            await this.findBaths();
            this.container.error(CONSTANTES.MESSAGE.DELETE, null, CONSTANTES.OPTIONS_TOASTR);
        } catch (error) {
            this.container.error(error.response.data.message, null, CONSTANTES.OPTIONS_TOASTR);
        }
    }

    isExistBatchs() {
        return this.state.batchs.length > 0;
    }

    async componentDidMount() {
        await this.findBaths();
    }

    render() {
        return (
            <Container title="Lotes" subTitle="Lista de lotes" >
                <ToastContainer ref={ref => this.container = ref} className="toast-top-right" />
                <Col lg={12}>
                    <Button type="primary" text="Novo lote" to="/lotes/novo" />
                </Col>
                <br />
                <br />
                <Col lg={12}>
                    <Box border title="" noPadding>
                        {!this.isExistBatchs() && <NotFound />}
                        {this.isExistBatchs() &&
                            <table className="table table-bordered text-center" >
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.batchs.map(batch => (
                                            <tr>
                                                <td>{batch.id}</td>
                                                <td>{batch.name}</td>
                                                <td>{batch.description}</td>
                                                <td>
                                                    <Button type="warning" icon="fa-pen"
                                                        to={`/lotes/${batch.id}/editar`} />
                                                    &nbsp;
                                                    <Button type="danger" icon="fa-trash"
                                                        onClick={() => this.removeItem(batch.id)}
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