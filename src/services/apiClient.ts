import axios from 'axios';
import Swal from 'sweetalert2';
import { userStore } from '@/stores/userStore';
import { loadingStore } from '@/stores/loadingStore';

const apiClient = axios.create({
  baseURL: '',
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  loadingStore.getState().setLoading(true);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    loadingStore.getState().setLoading(false);
    return response;
  },
  async (error) => {
    loadingStore.getState().setLoading(false);

    if (error.response) {
      const errorCode = error.response.data?.code;
      const errorMessage = error.response.data?.message;

      switch (errorCode) {
        case 'AUTH_ERROR':
          Swal.fire({ icon: 'error', text: errorMessage });
          userStore.getState().initUser();
          window.location.href = '/';
          break;
        default:
          if (error.response.status === 401) {
            userStore.getState().initUser();
            window.location.href = '/';
          } else if (errorMessage) {
            Swal.fire({ icon: 'error', text: errorMessage });
          }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
