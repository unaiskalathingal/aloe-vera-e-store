import React from 'react'
import Layout from './../componets/layout/Layout';

const AboutPage = () => {
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
        <h1>About Us</h1>
        <p>
          Welcome to our homemade aloe vera products store! We are passionate about creating natural and high-quality aloe vera products in various categories to enhance your well-being.
        </p>
        <p>
          Our mission is to provide you with products that promote health, beauty, and overall wellness. Each product is carefully crafted with love and attention to ensure the best experience for our customers.
        </p>
        <div style={{ marginTop: '20px' }}>
          <h3>Our Products</h3>
          <p>Explore our diverse range of homemade aloe vera products, including:</p>
          <ul>
            <li>Skincare products</li>
            <li>Haircare products</li>
            <li>Health supplements</li>
            <li>Aloe vera gels and creams</li>
            <li>And more...</li>
          </ul>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h3>Contact Us</h3>
          <p>Have questions or feedback? Reach out to us!</p>
          <p>Email: info@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
