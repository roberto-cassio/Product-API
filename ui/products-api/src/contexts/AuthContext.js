import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, signupUser} from '@/services/authService';
import { toast } from 'react-toastify';




const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedToken) {
     setUser(JSON.parse(savedUser));
    }
    setLoading(false)
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true)

      const response = await loginUser(email, password);

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      console.log(response.user)

      setUser(response.user);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false)
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logout realizado com sucesso!');
  };

  const signup = async (firstName, lastName, email, password) => {
    try {
      setLoading(true)

      const response = await signupUser(firstName, lastName, email, password);
      toast.success('Cadastro realizado com sucesso!');
      return { success:true };
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.');
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    } finally {
      setLoading(false)
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      signup,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
