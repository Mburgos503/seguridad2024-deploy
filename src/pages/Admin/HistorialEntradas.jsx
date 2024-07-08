import React from "react";
import AdminHeader from "../../components/AdminComponents/AdminHeader/AdminHeader";
import AdminTableEntradas from "../../components/AdminComponents/AdminTableEntradas/AdminTableEntradas";

const HistorialEntradas = () => {
    return (
        <div>
            <AdminHeader />
            <div className='container'>
                <div className="text-table-header">
                    <h1>Historial de entradas anónimas</h1>
                </div>
                <AdminTableEntradas />
            </div>
        </div>
    );
}

export default HistorialEntradas;