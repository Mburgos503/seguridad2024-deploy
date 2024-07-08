import React from "react";
import AdminHeader from "../../components/AdminComponents/AdminHeader/AdminHeader";
import AdminTerminalTable from "../../components/AdminComponents/AdminTerminalTable/AdminTerminalTable";

const Terminales = () => {
    return (
        <div>
            <AdminHeader />
        <div className='container'>
            <AdminTerminalTable />
        </div>

        </div>
    );
}

export default Terminales;