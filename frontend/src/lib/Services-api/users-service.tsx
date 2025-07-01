import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from 'axios'

interface ApiOptions extends AxiosRequestConfig {
  headers?: Record<string, string>
  type?: 'get' | 'post' | 'put' | 'delete'
}

interface User {
  id: string | null;
  name: string
  email: string
  password: string
}

interface UserResponse<T = User | null> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

interface LoginData {
  accessToken: string;
  user: User;
}
interface RegisterData {
  unHashedToken: string;
  user: {
    id: string;
    email: string;
  };
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseUrl = 'http://localhost:4000/api/v1'
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }

  private async customFetch<T = unknown>(
    endpoint: string,
    options: ApiOptions = {},
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const headers = { ...this.defaultHeaders, ...options.headers }

      const config: AxiosRequestConfig = {
        ...options,
        url,
        headers,
        withCredentials: true,
        method: options.type || 'get',
      }

      const response: AxiosResponse<T> = await axios(config)
      console.log('API Success Response:', response.data)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('API Error:', axiosError.response?.data || axiosError.message)
      
      // If the error response has data (like error messages from your backend),
      // return it as a failed response instead of throwing
      if (axiosError.response?.data) {
        console.log('Returning error response data:', axiosError.response.data)
        return axiosError.response.data as T
      }
      
      // If no response data, create a generic error response
      const genericError = {
        StatusCode: axiosError.response?.status || 500,
        Data: null,
        Message: axiosError.message || 'API request failed',
        success: false
      } as T
      
      return genericError
    }
  }

  public registerUser(data: User): Promise<UserResponse<RegisterData>> {
    return this.customFetch<UserResponse<RegisterData>>('/user/register', {
      type: 'post',
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      }
    });
  }

  public loginUser(email: string, password: string): Promise<UserResponse<LoginData>> {
    console.log('Making login request with:', { email, password })
    return this.customFetch<UserResponse<LoginData>>('/user/login', {
      type: 'post',
      data: {
        email: email,
        password: password,
      }
    });
  }

  public getUserProfile(): Promise<UserResponse> {
    console.log('getUserProfile called');
    return this.customFetch<UserResponse>('/user/getUserProfile', {
      type: 'get',
    });
  }
 
  public logoutUser(): Promise<{ message: string; success: boolean }> {
    console.log('logoutUser called');
    return this.customFetch<{ message: string; success: boolean }>('/user/logout', {
      type: 'post',
    });
  }
}

export const apiClient = new ApiClient()