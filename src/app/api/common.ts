import axios from 'axios';
import Swal from 'sweetalert2';
import { refreshToken } from './user/manage';
import { userStore } from '@/stores/userStore';
import { ApiReturn } from '../types/common/common';
import { loadingStore } from '@/stores/loadingStore';

const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_DOMAIN}`,
    withCredentials: true,
});

apiClient.interceptors.request.use((config)=> {
    loadingStore.getState().setLoading(true);
    return config;
});

apiClient.interceptors.response.use(response=> {
    loadingStore.getState().setLoading(false);
        return response;
    }
    , async (error) => {
        loadingStore.getState().setLoading(false);
        const originalRequest = error.config;
        
        if ( error.response ) {
            const errorCode = error.response.data.code;
            const errorMessage = error.response.data.message;

            switch ( errorCode ) {
                case "T-001":// 올바른 토큰 아님
                    Swal.fire({
                        icon: "error",
                        text: errorMessage,
                    });
                    break;
                case "T-002":// access token 만료
                    const res = await refreshToken();

                    const {success} = res as ApiReturn;
                    
                    if ( success ) {
                        return apiClient(originalRequest);
                    };
                    break;
                case "T-003":// refresh token 만료
                    console.log("T-003", userStore.getState());
                    userStore.getState().initUser();
                    window.location.href = "/";
                case "T-004":// 토큰 없음
                    Swal.fire({
                        icon: "error",
                        text: errorMessage,
                    });
                    break;
                case "T-005"://  토큰에 담긴 유저와 토큰 보낸 유저 다름
                    Swal.fire({
                        icon: "error",
                        text: errorMessage,
                    });
                    break;
            }
        }
        return error;
    }
);

export default apiClient;