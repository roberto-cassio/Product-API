import React from 'react';
import { useProducts, useAuth } from '../hooks';
import Card  from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import { ShoppingBag, Delete, Edit } from '@mui/icons-material';
import { toast} from 'react-toastify'
import { Pagination } from '@mui/material';
import {EditProductDialog} from '../components/forms';

const Products = () => {
  const { 
    products, 
    loading, 
    deleteProduct, 
    currentPage, 
    totalElements, 
    size, 
    handlePageChange 
  } = useProducts();
  const {isAuthenticated} = useAuth();
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [isEditDialogOPen, setIsEditDialogOpen] = React.useState(false);

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm('Tem certeza que deseja deletar este produto?');
    if (!confirmed) return;

    try {
      await deleteProduct(productId);
      toast.success('Produto deletado com sucesso!');
    } catch(error) {
      console.error('Erro ao deletar produto:', error);
      toast.error('Ocorreu um erro ao deletar o produto. Tente novamente mais tarde.');
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(products.length > 0 ? products.length : 6)].map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-6 w-20" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <ShoppingBag className="text-primary" style={{ fontSize: 40 }} />
            Nossos Produtos
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore nossos produtos
          </p>
        </div>

        {products.length === 0 && totalElements === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="text-muted-foreground" style={{ fontSize: 32 }} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground">
              Ainda não há produtos cadastrados no sistema.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="card-product ">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    R$ {product.priceInReais.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    <Edit 
                      fontsize="inherit" 
                      className={`${isAuthenticated ? "text-green-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
                      onClick={() => isAuthenticated && handleEditProduct(product)}
                    />
                    <Delete 
                      fontsize="inherit" 
                      className={`${isAuthenticated ? "text-purple-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
                      onClick={() => isAuthenticated && handleDeleteProduct(product.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Paginação - só aparece se houver mais de uma página */}
        {totalElements > size && (
          <div className="flex justify-center mt-12">
            <Pagination 
              count={Math.ceil(totalElements / size)} 
              page={currentPage + 1}
              onChange={(event, page) => handlePageChange(page - 1)}
              color="primary"
              size="large"
              showFirstButton 
              showLastButton
            />
          </div>
        )}
      </div>
      <EditProductDialog
        product={editingProduct}
        open={isEditDialogOPen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
};

export default Products;