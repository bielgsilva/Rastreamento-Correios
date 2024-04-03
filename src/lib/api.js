import axios from "axios";

const api = axios.create({
  baseURL: "https://api.mercadopago.com",
});

api.interceptors.request.use(async config => {
  const token = "APP_USR-882753531531363-040120-243a956d4d02aacc804f6e986881b29e-717124142";
  
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;