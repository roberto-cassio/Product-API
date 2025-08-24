import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import Card  from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import { ShoppingBag } from '@mui/icons-material';

const Products = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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

        {products.length === 0 ? (
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
              <div key={product.id} className="card-product">
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
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;