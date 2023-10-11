import axios, { AxiosInstance } from 'axios';

class AxiosBase {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
    this.axiosInstance.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/json';
      return config;
    });
  }
}

export default AxiosBase;
