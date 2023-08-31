import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const renderBase: AxiosInstance = axios.create({
  // baseURL: "http://192.168.1.104:3333",
  baseURL: "http://pegpagapi.acutistecnologia.com"
});

export default renderBase;
