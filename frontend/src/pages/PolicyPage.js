import React from 'react'
import Layout from './../componets/layout/Layout';

const PolicyPage = () => {
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
      <h1>Our Policies</h1>
      <div style={{ marginTop: '20px' }}>
        <h3>Product Quality</h3>
        <p>We take pride in offering 100% natural homemade aloe vera products. Our products are carefully crafted with high-quality ingredients to ensure their natural goodness and effectiveness. We prioritize your well-being and strive to deliver products with no side effects.</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Returns and Refunds</h3>
        <p>Due to the nature of our products, we do not accept returns or offer refunds. However, if you have received a damaged or defective item, please contact us within 7 days of receiving your order, and we will do our best to resolve the issue.</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Contact Us</h3>
        <p>If you have any questions or concerns about our policies or products, feel free to reach out to us:</p>
        <p>Email: info@example.com</p>
        <p>Phone: +1 (123) 456-7890</p>
      </div>
    </div>
  </Layout>
  )
}

export default PolicyPage
