import React from 'react';
import AdminLTE from "adminlte-2-react";
import Sidebar from "./Sidebar";

export default (props) => (
    <AdminLTE
        title={["IRancho"]}
        titleShort={["IR"]}
        theme="blue"
        sidebar={Sidebar} >
        {props.children}
    </AdminLTE>
);
