import React from "react";
import { Content, Row } from "adminlte-2-react";

export default (props) => (
    <Content title={props.title} subTitle={props.subTitle}>
      <Row>
          {props.children}
      </Row>
    </Content>
);