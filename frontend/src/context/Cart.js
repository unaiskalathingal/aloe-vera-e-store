import React, { useState, useEffect, useContext, createContext } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Fetch cart from localStorage when the component mounts
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []); // Empty dependency array ensures it only runs once when the component mounts

    useEffect(() => {
        // Update localStorage whenever the cart changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]); // Dependency array ensures it runs whenever the cart changes

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
}

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
