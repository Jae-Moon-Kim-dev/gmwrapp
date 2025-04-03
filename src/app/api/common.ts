import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_DOMAIN}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
}); 

apiClient.interceptors.request.use((config) => {
    const xsrfToken = decodeURIComponent(
        document.cookie.split('; ').find(row=> row.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
    );

    if ( xsrfToken ) {
        config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;