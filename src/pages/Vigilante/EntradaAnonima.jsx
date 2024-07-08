import React from 'react'
import VigilanteHeader from '../../components/VigilanteComponents/VigilanteHeader/VigilanteHeader'
import FormEntradaAnonima from '../../components/VigilanteComponents/FormEntradaAnonima/FormEntradaAnonima.jsx'

const EntradaAnonima = () => {
  return (
    <div>
      <VigilanteHeader />
      <div className="container">
        <FormEntradaAnonima />

      </div>
    </div>
  )
}

export default EntradaAnonima