import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct as deleteProductService } from '../services/productService';
import { toast} from 'react-toastify'



const ProductContext = createContext();

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
        toast.error('Ocorreu um erro ao buscar os produtos. Tente novamente mais tarde.');
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

  const updateProducts = async (productId, updateProductData) => {
    try {
      const updatedProduct = await updateProduct(productId, updateProductData);
      setProducts((prev) => prev.map(product => product.id === productId ? updatedProduct : product));
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteProductService(productId);
      setProducts((prev) => prev.filter(product => product.id !== productId));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      deleteProduct,
      updateProducts,
      loading,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export {ProductContext};
