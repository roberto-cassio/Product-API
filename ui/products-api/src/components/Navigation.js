import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button'
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Logout, Person, Add } from '@mui/icons-material';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { user, isAuthenticated, logout} = useAuth();

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-primary">
              Loja do Bebeto
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link 
                to="/products" 
                className={`nav-link flex items-center space-x-2 ${isActive('/products') ? 'text-primary' : ''}`}
              >
                <ShoppingBag fontSize="small" />
                <span>Produtos</span>
              </Link>
              
              {isAuthenticated && (
                <Link 
                  to="/products/create" 
                  className={`nav-link flex items-center space-x-2 ${isActive('/products/create') ? 'text-primary' : ''}`}
                >
                  <Add fontSize="small" />
                  <span>Cadastrar Produto</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-muted-foreground">Olá, {user?.firstName} {user?.lastName}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                   onClick={logout}
                >
                  <Logout fontSize="small" />
                  <span>Sair</span>
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="btn-gradient">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;