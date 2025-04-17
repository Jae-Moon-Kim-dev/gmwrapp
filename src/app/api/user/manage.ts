import { ApiReturn } from "@/app/types/common/common";
import apiClient from "../common";
import { initUserData, Login, User } from "@/app/types/user/user";
import Swal from 'sweetalert2';
import { userStore } from '@/stores/userStore';

export const login = async (loginData: Login) => {
    try {
        const res = await apiClient.post('/api/v1/login', {
            mem_id: loginData.id,
            password: loginData.pwd,
        });

        if ( res ) {
            const {success, message} = res.data as ApiReturn;
        
            if ( !success ) {
                Swal.fire({
                    icon: "error",
                    text: message
                });
            };

            return success;
        }
    } catch (e) {
        console.log('error', e);
    }
};

export const getUser = async ():Promise<User> => {
    const res = await apiClient.post('/api/v1/user');
    const {success, data, message} = res.data as ApiReturn;

    if ( !success ) {
        Swal.fire({
            icon: "error",
            text: message
        });
    }

    return (data || initUserData) as User;
};

export const refreshToken = async ():Promise<ApiReturn> => {
    const res = await apiClient.post('/api/v1/refreshToken');

    return res.data as ApiReturn;
}

export const logout = async () => {
    const initUserStore = userStore.getState().initUser;

    const res = await apiClient.post('/api/v1/logout', {});
    const {success, message} = res.data as ApiReturn;

    if ( !success ) {
        Swal.fire({
            icon: "error",
            text: message
        });
    };
    
    initUserStore();
};