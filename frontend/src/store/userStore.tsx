import {create} from 'zustand'
// import {immer} from 'zustand/middleware/immer'
import {apiClient} from '@/lib/Services-api/users-service'

interface UserState {
  id: string | null
  name: string 
  email: string 
  password: string 
}
interface UserStore {
  user: UserState | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  registerUser: (user: UserState) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  getUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => (  {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,

    registerUser: async (user: UserState) => {
      set({ loading: true, error: null });
      try {
        const response = await apiClient.registerUser({
          id: null,
          name: user.name,
          email: user.email,
          password: user.password
        });
        set({
          user: {
            id: response.Data?.id ?? null,
            name: response.Data?.name ?? '',
            email: response.Data?.email ?? '',
            password: response.Data?.password ?? ''
          },
          loading: false,
          error: null,
          isAuthenticated: true
        });
       console.log(response) 
      } catch (error: any) {
        set({ loading: false, error: error.message });
      }
    },
    loginUser: async (email: string, password: string) => {
      set({ loading: true, error: null });
      try {
        const response = await apiClient.loginUser(
          email, password
        );
        set({
          user: {
            id: response.Data?.id ?? null,
            name: response.Data?.name ?? '',
            email: response.Data?.email ?? '',
            password: response.Data?.password ?? ''
          },
          loading: false,
          error: null,
          isAuthenticated: true
        });
        console.log(response) 
      } catch (error: any) {
        set({ loading: false, error: error.message });
      }
    },
    getUser: async () => {
      set({ loading: true, error: null });
      try {
        const response = await apiClient.getUserProfile();
        set({
          user: {
            id: response.Data?.id ?? null,
            name: response.Data?.name ?? '',
            email: response.Data?.email ?? '',
            password: response.Data?.password ?? ''
          },
          loading: false,
          error: null,
          isAuthenticated: true
        });
        console.log(response)
      } catch (error: any) {
        set({ loading: false, error: error.message });
      }
    }
}))
