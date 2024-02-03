import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';
import Layout from '../componets/layout/Layout';
import { useCart } from '../context/Cart';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  
  // Assume useCart hook is imported and available
  const [cart, setCart] = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/product/get-product/${productId}`
        );

        if (data.success && data.message === 'Product retrieved successfully') {
          setProduct(data.product);
        } else {
          console.error('Invalid response structure:', data);
          
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success(`${product.name} added to Cart`);
        return updatedCart;
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Add the product to the cart
      setCart((prevCart) => {
        const updatedCart = [...prevCart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success(`${product.name} added to Cart`);
        return updatedCart;
      });

      // Navigate to the cart page
      navigate('/cart');
    }
  };

  if (!product) {
    return <p >Loading product details...</p>;
  }

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80%' }}>
        <Card style={{ width: '28rem', textAlign: 'center' }}>
          <Card.Img
            variant="top"
            src={`http://localhost:4000/api/v1/product/product-photo/${productId}`}
          />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>Description: {product.description}</Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text>Available Stock: {product.quantity}</Card.Text>
            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={handleBuyNow}>
                Buy Now
              </Button>
              <Button variant="success" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductDetails;
