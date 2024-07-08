import React from 'react';
import './ContactUsSection.css';

const ContactUsSection = () => {
  return (
    <section className="contact-us" id='contact-us'>
      <h1>¡Contáctanos!</h1>
      <p>Estamos aquí para ayudarte. Puedes contactarnos a través de los siguientes medios:</p>
      <div className="contact-info">
        <div className="contact-item">
          <h2>Correos Electrónicos</h2>
          <p><a href="mailto:00042220@uca.edu.sv">00042220@uca.edu.sv</a></p>
          <p><a href="mailto:00063121@uca.edu.sv">00063121@uca.edu.sv</a></p>
        </div>
        <div className="contact-item">
          <h2>Números de Contacto</h2>
          <p><a href="tel:+503 8765 4321">+503 8765 4321</a></p>
          <p><a href="tel:+503 7880 1505">+503 7880 1505</a></p>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
