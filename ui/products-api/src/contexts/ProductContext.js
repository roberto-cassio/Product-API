import React, { createContext, useContext, useState, useEffect } from 'react';




const ProductContext = createContext(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

const mockProducts = [
  {
    id: '1',
    name: 'Mock Product 1',
    description: 'Mock Product 1',
    price: 3500.00,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mock Product 2',
    description: 'Mock Product 2',
    price: 120.00,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Mock Product 3',
    description: 'Mock Product 3',
    price: 280.00,
    createdAt: new Date().toISOString(),
  },
];


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    // TODO: Add Toast
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
