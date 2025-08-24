import React, { createContext, useContext, useState, useEffect } from 'react';




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

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    // Simulação de login
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      // TODO: Toast login success
      return true;
    } else {
      // TODO: Toast login error
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // TODO: Toast logout
  };

  const register = async (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u) => u.email === email)) {
      // TODO: Toast email already in use
      return false;
    }
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    // TODO: Toast register success
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
