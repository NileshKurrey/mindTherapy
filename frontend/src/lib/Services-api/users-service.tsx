import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from 'axios'

interface ApiOptions extends AxiosRequestConfig {
  headers?: Record<string, string>
  type?: 'get' | 'post' | 'put' | 'delete' // Added type for method
}

interface User {
  id: string | null;
  name: string
  email: string
  password: string
}
interface UserResponse {
   StatusCode: number;
   Data: User | null; // Data can be null if user not foun
   Message: string;
   success: boolean;
}
class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseUrl = 'http://localhost:4000/api/v1'
    this.defaultHeaders = {
      'Content-Type': 'application/json', // Fixed typo
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
        withCredentials: true, // Fixed spelling
        method: options.type || 'get', // Use type or default to get
      }

      const response: AxiosResponse<T> = await axios(config)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      console.error(
        'API Error:',
        axiosError.response?.data || axiosError.message,
      )
      throw axiosError.response?.data || new Error('API request failed')
    }
  }
  public registerUser(data: User): Promise<UserResponse> {
    return this.customFetch<UserResponse>('/user/register', {
      type: 'post',
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      }
    },);
  }
  public loginUser(email: string, password: string): Promise<UserResponse> {
    return this.customFetch<UserResponse>('/user/login', {
      type: 'post',
      data: {
        email: email,
        password: password,
      }
    });
  }
 public getUserProfile(): Promise<UserResponse> {  
    return this.customFetch<UserResponse>('/user/profile', {
      type: 'get',
    });
  }  
}

export const apiClient = new ApiClient()