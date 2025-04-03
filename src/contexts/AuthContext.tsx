
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API functions - In a real app, these would connect to a backend
const mockLogin = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check credentials (mockup)
  if (email === 'admin@quizwhiz.com' && password === 'admin123') {
    return {
      user: {
        id: '1',
        username: 'Admin User',
        email: 'admin@quizwhiz.com',
        isAdmin: true,
        createdAt: new Date().toISOString()
      },
      token: 'mock-admin-token-xyz'
    };
  } else if (email === 'user@example.com' && password === 'user123') {
    return {
      user: {
        id: '2',
        username: 'Regular User',
        email: 'user@example.com',
        isAdmin: false,
        createdAt: new Date().toISOString()
      },
      token: 'mock-user-token-xyz'
    };
  }

  throw new Error('Invalid credentials');
};

const mockRegister = async (
  username: string, 
  email: string, 
  password: string
): Promise<{ user: User; token: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, this would create a new user
  return {
    user: {
      id: Math.random().toString(36).substring(2, 9),
      username,
      email,
      isAdmin: false,
      createdAt: new Date().toISOString()
    },
    token: 'mock-new-user-token-xyz'
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for saved token in localStorage
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');

    if (savedToken && savedUser) {
      try {
        setAuthState({
          user: JSON.parse(savedUser),
          token: savedToken,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { user, token } = await mockLogin(email, password);
      
      // Save to localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
      
      toast.success(`Welcome back, ${user.username}!`);
      
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error('Login failed: Invalid credentials');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { user, token } = await mockRegister(username, email, password);
      
      // Save to localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
      
      toast.success(`Welcome to QuizWhiz, ${username}!`);
      navigate('/dashboard');
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
    
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
