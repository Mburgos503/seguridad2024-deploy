import React from "react";
import AdminHeader from "../../components/AdminComponents/AdminHeader/AdminHeader";
import AdminHomeTables from "../../components/AdminComponents/AdminHomeTables/AdminHomeTables";

const Hogares = () => {
    return (
        <div>
            <AdminHeader />
            <div className='container'>
                <div className="text-table-header">
                    <h1>Hogares y sus residentes</h1>
                </div>
                <AdminHomeTables />
            </div>

        </div>
    );
}

export default Hogares;