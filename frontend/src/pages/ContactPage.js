import React from 'react'
import Layout from './../componets/layout/Layout';

const ContactPage = () => {
  return (
    <Layout>
    <div
    style={{
      padding: '20px',
      margin: '20px auto',
      maxWidth: '600px',
      textAlign: 'center',
    }}
  >
    <h1>Contact Us</h1>
    <p>
      Have questions or suggestions? Feel free to reach out to us. We are here to help!
    </p>
    <div style={{ marginTop: '20px' }}>
      <h3>Our Information</h3>
      <p>Email: info@example.com</p>
      <p>Phone: +1 (123) 456-7890</p>
      <p>Address: 123 Main Street, Cityville, Country</p>
    </div>
  </div>
    </Layout>
  )
}

export default ContactPage
