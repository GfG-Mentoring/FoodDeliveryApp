import Axios from 'axios';

const api = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export { api };
