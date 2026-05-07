import React, { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage if it exists
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('khet_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Helper function to get all users from local storage
  const getAllUsers = () => {
    const users = localStorage.getItem('khet_all_users');
    return users ? JSON.parse(users) : [];
  };

  // Simple login function
  const login = (phone, password) => {
    const users = getAllUsers();
    let foundUser = users.find(u => u.phone === phone && u.password === password);
    
    // Default demo user for easy testing during presentation
    if (!foundUser && phone === '12345' && password === '12345') {
      foundUser = { name: 'Demo Farmer', role: 'farmer', phone: '12345' };
    }

    if (foundUser) {
      const sessionUser = { name: foundUser.name, role: foundUser.role, phone: foundUser.phone };
      setUser(sessionUser);
      localStorage.setItem('khet_user', JSON.stringify(sessionUser));
      return sessionUser; // Return user object on success
    }

    return null; // Return null on failure
  };

  // Simple registration function
  const register = (name, phone, password, role, location) => {
    const users = getAllUsers();
    
    if (users.find(u => u.phone === phone)) {
      alert("This phone number is already registered!");
      return null;
    }

    const newUser = { name, phone, password, role, location };
    users.push(newUser);
    localStorage.setItem('khet_all_users', JSON.stringify(users));
    
    // Auto login after registration
    setUser(newUser);
    localStorage.setItem('khet_user', JSON.stringify(newUser));
    return newUser; // Return user object on success
  };

  // Simple logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('khet_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context easily
export const useAuth = () => useContext(AuthContext);
