import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct as deleteProductService } from '../services/productService';
import { toast} from 'react-toastify'



const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try{
        const products = await fetchProducts(currentPage, size);
        setProducts(products.content);
        setTotalElements(products.totalElements)
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Ocorreu um erro ao buscar os produtos. Tente novamente mais tarde.');
      }finally{
        setLoading(false)
      }
    }
  loadProducts()
  }, [currentPage, size]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data.content);
    } catch (error) {
      toast.error('Ocorreu um erro ao recarregar os Produtos')
    }
  }
  
  const addProduct = async (productData) => {
    try {
    const newProduct = await createProduct(productData);
    setProducts((prev) => [...prev, newProduct]);
    await loadProducts()

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
      await loadProducts()
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
      totalElements,
      loading,
      size,
      currentPage,
      handlePageChange,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export {ProductContext};
