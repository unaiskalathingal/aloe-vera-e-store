import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

import { useCart } from '../context/Cart';
import toast from 'react-hot-toast';
import Layout from '../componets/layout/Layout';
import PageNotFound from '../componets/layout/PageNotFound';

const ProductsByCategories = () => {
  const [cart, setCart] = useCart();
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, [setCart]);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/product/get-products-by-category/${categoryId}`
        );

        if (data.success && data.message === 'Products retrieved successfully') {
          const categoryData = data.products[0].category;

          setCategory({
            _id: categoryData._id,
            name: categoryData.name,
          });

          setProducts(data.products);
        } else {
          console.error('Invalid response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching category and products:', error);
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId]);


  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success(`${product.name} added to Cart`);
      return updatedCart;
    });
  };

  const handleProductClick = (event, productId) => {
    // Navigate to the product details page only if the click target is not a button
    if (!event.target.closest('button')) {
      navigate(`/products/${productId}`);
    }
  };

  if (!category) {
    return <PageNotFound/>;
  }
  const handleBuyNow = (productId) => {
    // Find the selected product based on productId
    const selectedProduct = products.find((product) => product._id === productId);

    // Add the selected product to the cart
    setCart((prevCart) => {
      const updatedCart = [...prevCart, selectedProduct];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success(`${selectedProduct.name} added to Cart`);
      return updatedCart;
    });

    // Navigate to the cart page
    navigate('/cart');
  };
  return (
    <Layout>
      <div className="my-5 m-5">
        {products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mb-4 product-link">
                
                <div
                  onClick={(event) => handleProductClick(event, product._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="col-md-9 mb-3" >
                    {product.category.photo && (
                      <img
                        className="card-img-top"
                        src={`${process.env.REACT_APP_API_BASE_URL}/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        style={{ height: '160px', objectFit: 'cover' }}
                      />
                    )}
                    <div className="card-body">
                      <h4 className="card-title">{product.name}</h4>
                     
                      <p className="card-text">
                        <strong>Price:</strong> ₹{product.price}
                      </p>
                      <p className="card-text">
                        <strong>Available Stock:</strong> {product.quantity}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          
                          className="btn btn-primary"
                          onClick={() => handleBuyNow(product._id)}
                         >
                          Buy Now
                        </button>
                        <span className="mx-1"></span>
                        <button
                          className="btn btn-success"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </Layout>
  );
};

export default ProductsByCategories;
