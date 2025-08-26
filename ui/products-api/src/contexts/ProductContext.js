import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts, createProduct } from '../services/productService';




const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try{
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }finally{
        setLoading(false)
      }
    }
  loadProducts()
  }, []);

  const addProduct = async (productData) => {
    try {
    const newProduct = await createProduct(productData);
    setProducts((prev) => [...prev, newProduct]);

    return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error 
    }
  };
  
  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      loading,
    }}>
      {children}
    </ProductContext.Provider>
  );
}
