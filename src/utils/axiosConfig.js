import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Redirect to the login page or a 401 error page
      // Example: history.push('/login');
    }
    return Promise.reject(error);
  }
);

export default instance;