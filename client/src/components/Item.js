import React from "react";
import { Col, Button } from "adminlte-2-react";
import "../styles/item.css";

export default (props) => (
    <Col md="12" className="item" >
        <Col md="11" className="text-bold item-text">{props.text}</Col>
        <Col md="1" >
            <Button type="danger" icon="fa-trash" onClick={props.removeAction} />
        </Col>
    </Col>
)