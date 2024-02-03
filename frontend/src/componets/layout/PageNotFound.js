import React from 'react'
import Layout from './Layout';

const PageNotFound = () => {
  return (
    <Layout>
    <div style={styles.container}>
    <h1 style={styles.heading}>404 - Page Not Found</h1>
    <p style={styles.message}>Sorry, the page you are looking for might be in another castle.</p>
  </div>
    </Layout>
  )
}
const styles = {
    container: {
      textAlign: 'center',
      marginTop: '50px',
    },
    heading: {
      fontSize: '2em',
      color: '#333',
    },
    message: {
      fontSize: '1.2em',
      color: '#666',
    },
  };
export default PageNotFound
