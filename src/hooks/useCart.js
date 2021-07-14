import React from 'react';
import AppContext from '../context';

export const useCart = () =>{

    const baseUrl = 'http://localhost:3002';
    
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0)

    return {cartItems, setCartItems, totalPrice}
}

