import React from "react";
import InputMask from "react-input-mask";

export default (props) => {

    return (
        <div className="form-group">
            <label>{props.label}:</label>
            { props.mask &&
                <InputMask mask={props.mask}
                    type={props.type || "text"}
                    value={props.value}
                    className="form-control"
                    onChange={(event) => props.handlerValue(props.fieldName, event.target.value)}
                />
            }

            {!props.mask &&
                <input type={props.type || "text"}
                    value={props.value}
                    className="form-control"
                    onChange={(event) => props.handlerValue(props.fieldName, event.target.value)}
                />
            }

            {props.isExistErrorMessage(props.fieldName) &&
                <span className="text-danger">
                    {props.message}
                </span>
            }
        </div>
    );
}