import React, {useEffect} from 'react'
import LogInHeader from '../components/LandingComponents/LogInHeader/LogInHeader'
import LogInForm from '../components/LandingComponents/LogInForm/LogInForm'


const LogIn = () => {
  
  useEffect(() => {
    document.title = 'Log in';
}, []); 

  return (
    <div>
      <LogInHeader/>      
      <div className="container">
        <LogInForm/>
      </div>
    </div>
  )
}

export default LogIn