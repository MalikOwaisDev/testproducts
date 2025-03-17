import axios from './axios';
import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || null);

  const getProducts = async () => {
    try {
      const { data } = await axios('/products');

      // Save data to localStorage
      localStorage.setItem('products', JSON.stringify(data));

      // Set state with the fetched data
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // If no products are in localStorage, fetch from API
    getProducts();
  }, []);

  return <ProductContext.Provider value={[products, setProducts]}>{props.children}</ProductContext.Provider>;
};

export default Context;
