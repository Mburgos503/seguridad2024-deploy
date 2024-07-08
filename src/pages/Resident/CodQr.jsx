import React from 'react'
import NormalResidentHeader from '../../components/NormalResidentComponents/NormalResidentHeader/NormalResidentHeader'
import NResidentQR from '../../components/NormalResidentComponents/NResidentQR/NResidentQR'

const CodQr = () => {
  return (
    <div>
      <NormalResidentHeader />
      <div className="container">
        <NResidentQR />
      </div>

    </div>

  )
}

export default CodQr