import React from "react";

export default (props) => {
    return (
        <div className="form-group">
            <label>{props.label}:</label>
            <input type="text"
                value={props.value}
                className="form-control"
                onChange={(event) => props.handlerValue(props.fieldName, event.target.value)}
            />
            {props.isExistErrorMessage(props.fieldName) &&
                <span className="text-danger">
                    {props.message}
                </span>
            }
        </div>
    );
}