import React from 'react'
import EResidenteHeader from '../../components/EResidenteHeader/EResidenteHeader'
import EResidentMiHogar from '../../components/EResidentComponents/MiHogar/EResidentMiHogar'

const MiHogar = () => {
    return (
        <div>

            <EResidenteHeader />
            <div className="text-table-header">
                <h1>Agregar usuario a mi hogar</h1>
            </div>
            <EResidentMiHogar />

        </div>
    )
}

export default MiHogar