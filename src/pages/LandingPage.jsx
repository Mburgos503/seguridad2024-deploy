import React, { useEffect } from 'react'
import LandingHeader from "../components/LandingComponents/LandingHeader/LandingHeader";
import LandingWelcome from '../components/LandingComponents/LandingWelcome/LandingWelcome';
import LandingTitle from '../components/LandingComponents/LandingTitle/LandingTitle';
import LandingCards from '../components/LandingComponents/LandingCards/LandingCards';
import ContactUsSection from '../components/LandingComponents/ContactUsSection/ContactUsSection';
import '../components/styles/Animation.css'

const LandingPage = () => {

  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <div className='container-landing'>
      <LandingHeader />
      <LandingWelcome />
      <LandingTitle subTitle='Nuestras especialidades en los campos requeridos' title='Lo que te ofrecemos' />
      <LandingCards />
      <ContactUsSection />

    </div>
  )
}

export default LandingPage