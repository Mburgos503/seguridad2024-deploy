import React from 'react'
import NormalResidentHeader from '../../components/NormalResidentComponents/NormalResidentHeader/NormalResidentHeader'
import SentSolicitudesTable from '../../components/NormalResidentComponents/SentSolicitudesTable/SentSolicitudesTable'

const HistorialSolicitud = () => {
  return (
    <div>
      <NormalResidentHeader />
      <div className='container'>
          <div className="text-table-header">
            <h1>Historial de solicitudes</h1>
          </div>
          <SentSolicitudesTable />
      </div>
    </div>
  )
}

export default HistorialSolicitud