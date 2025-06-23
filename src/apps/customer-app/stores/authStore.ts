import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthResponse } from '../types/api';
import signIn from '../api/auth/signIn';
import signUp from '../api/auth/signUp';

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: SignUpData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: AuthResponse = await signIn(email, password);          console.log('🔍 Login response:', response);
          
          // Extract user data and token from response
          const userData = response.data.user;
          const token = response.data.token;  // Token is inside data object
          
          console.log('🔍 Extracted token:', token);
          console.log('🔍 Token type:', typeof token);
          console.log('🔍 User data:', userData);
          
          set({
            user: userData,
            token: token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          // Store user data and token for persistence
          localStorage.setItem('userName', `${userData.firstName} ${userData.lastName}`);
          localStorage.setItem('userId', userData.id.toString());
          localStorage.setItem('userEmail', userData.email);
          if (token) {
            localStorage.setItem('authToken', token);
            console.log('✅ Token stored in localStorage:', token);
          } else {
            console.log('❌ No token received from backend');
          }} catch (error: any) {
          console.error('Login error:', error);
          let errorMessage = 'Login failed';
          
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage
          });
          throw error;
        }      },

      register: async (userData: SignUpData) => {
        set({ isLoading: true, error: null });
        try {
          const response: AuthResponse = await signUp(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.password,
            userData.role
          );
            // Extract user data and token from response
          const user = response.data.user;
          const token = response.data.token;
          
          set({
            user: user,
            token: token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          // Store user data and token for persistence
          localStorage.setItem('userName', `${user.firstName} ${user.lastName}`);
          localStorage.setItem('userId', user.id.toString());
          localStorage.setItem('userEmail', user.email);
          if (token) {
            localStorage.setItem('authToken', token);
          }
          
        } catch (error: any) {
          console.error('Registration error:', error);
          let errorMessage = 'Registration failed';
          
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage
          });
          throw error;
        }
      },      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
        
        // Clear all user data from localStorage
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('authToken');
      },

      clearError: () => {
        set({ error: null });
      },

      getToken: () => {
        const state = get();
        return state.token || localStorage.getItem('authToken');
      }
    }),    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
