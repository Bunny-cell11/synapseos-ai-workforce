import axios from "axios";

const api = axios.create({
  baseURL:
    "https://synapseos-backend-4v9x.onrender.com"
});

export default api;
