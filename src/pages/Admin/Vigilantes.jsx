import React from "react";
import AdminHeader from "../../components/AdminComponents/AdminHeader/AdminHeader";
import AdminVigilanteTable from "../../components/AdminComponents/AdminVigilanteTable/AdminVigilanteTable";

const Vigilantes = () => {
    return (
        <div>
            <AdminHeader />
        <div className='container'>
            <AdminVigilanteTable />
        </div>

        </div>
    );
}

export default Vigilantes;