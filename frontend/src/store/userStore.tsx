import {create} from 'zustand'
import {apiClient} from '@/lib/Services-api/users-service'

interface UserState {
  id: string | null
  name: string   
  email: string   
  password: string 
}

interface UserStore {
  user: UserState | null;
  loader: boolean;
  isAuthenticated: boolean;
  message: string | null;
  success: boolean;
  error: string | null;
  registerUser: (user: UserState) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  getUser: (ishover: boolean | void) => Promise<void>;
  logoutUser: () => Promise<void>;
  clearState: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loader: false,
  error: null,
  message: null,
  success: false,
  isAuthenticated: false,
   registerUser: async (user: UserState) => {
    set({ loader: true, error: null, success: false });
    try {
      const response = await apiClient.registerUser({
        id: null, 
        name: user.name,
        email: user.email,
        password: user.password
      });
      
      // Check if response is successful and has data
      if (response.success && response.data) {
        set({
          user: {
            id: response.data.user.id ?? null,
            email: response.data.user.email ?? '',
            password: '',
            name:  '', // Use the name from the input
          },
          loader: false,
          error: null,
          message: response.message || 'Registration successful',
          success: true,
          isAuthenticated: true
        });
      } else {
        // Registration failed
        set({ 
          loader: false, 
          error: response.message || 'Registration failed',
          success: false,
          isAuthenticated: false,
          message: null
        });
      }
    } catch (error: any) {
      set({ 
        loader: false, 
        error: error.message || 'Registration failed',
        success: false,
        isAuthenticated: false,
        message: null
      });
    }
  },

  loginUser: async (email: string, password: string) => {
    
    set({ loader: true, error: null, success: false });
    try {
      const response = await apiClient.loginUser(email, password);
      console.log('Login response in store:', response);
      
      // Check if response is successful and has data
      if (response.success && response.data) {
        set({
          user: {
            id: response.data.user.id ?? null,
            name: response.data.user.name ?? '',
            email: response.data.user.email ?? '',
            password: ''
          },
          loader: false,
          error: null,
          message: response.message || 'Login successful',
          success: true,
          isAuthenticated: true
        });
      } else {
        set({ 
          loader: false, 
          error: response.message || 'Login failed',
          success: false,
          isAuthenticated: false,
          message: null
        });
      }
    } catch (error: any) {
      set({ 
        loader: false, 
        error: error.message || 'Login failed',
        success: false,
        isAuthenticated: false,
        message: null
      });
    }
  },

  getUser: async (ishover: boolean | void) => {
    if(ishover){
      set({ loader: false, error: null });
    }
    else{
    set({ loader: true, error: null });
    }
    try {
      const response = await apiClient.getUserProfile()
      
      // Check if response is successful and has data
      if (response.success && response.data) {
        set({
          user: {
            id: response.data.id ?? null,
            name: response.data.name ?? '',
            email: response.data.email ?? '',
            password: response.data.password ?? ''
          },
          loader: false,
          error: null,
          isAuthenticated: true
        });
        
      } else {
        // Get user failed
        set({ 
          user: null,
          loader: false, 
          error: response.message || 'Failed to get user profile',
          isAuthenticated: false
        });
        // throw new Error(response.message || 'Failed to get user profile');
      }
    } catch (error: any) {
      set({ 
        user: null,
        loader: false, 
        isAuthenticated: false
      });
      throw error; // Re-throw for the _authenticated route
    }
  },
  logoutUser: async () => {
    set({ loader: true, error: null, success: false });
    try {
      const response = await apiClient.logoutUser();
      
      if (response.success) {
        set({
          user: null,
          loader: false,
          error: null,
          message: response.message || 'Logout successful',
          success: true,
          isAuthenticated: false
        });
      } else {
        set({ 
          loader: false, 
          error: response.message || 'Logout failed',
          success: false,
          isAuthenticated: true,
          message: null
        });
      }
    } catch (error: any) {
      set({ 
        loader: false, 
        error: error.message || 'Logout failed',
        success: false,
        isAuthenticated: true,
        message: null
      });
    }
  },
  clearState: () => {
    set({
      error: null,
      success: false,
      message: null
    });
  }
}))