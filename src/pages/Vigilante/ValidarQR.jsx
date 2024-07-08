import React from 'react'
import VigilanteHeader from '../../components/VigilanteComponents/VigilanteHeader/VigilanteHeader'
import VigilanteValidarQR from '../../components/VigilanteComponents/VigilanteValidarQR/VigilanteValidarQR'

const ValidarQR = () => {
  return (
    <div>
      <VigilanteHeader />
      <div className="container">
        
        <VigilanteValidarQR />
      </div>
    </div>
  )
}

export default ValidarQR