import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const renderBase: AxiosInstance = axios.create({
  // baseURL: "http://192.168.1.104:3333",
  baseURL: "http://18.189.26.38/pegpag-api"
});

export default renderBase;
