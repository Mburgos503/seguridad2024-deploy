import React from 'react'
import EResidenteHeader from '../../components/EResidenteHeader/EResidenteHeader'
import SolicitudesAll from '../../components/EResidentComponents/SolicitudesAll/SolicitudesAll'

const EResidentPermisos = () => {
  return (
    <div>
      <EResidenteHeader />
      <div className="text-table-header">
        <h1>Historial de solicitudes de mi hogar</h1>
      </div>
      <div className="container">
        <SolicitudesAll />

      </div>
    </div>
  )
}

export default EResidentPermisos