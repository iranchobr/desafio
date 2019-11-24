import React from "react";

export default class Form extends React.Component {

    constructor(props) {
        super(props);
    }

    isEditionMode() {
        return this.props.match.params.id != null;
    }
}