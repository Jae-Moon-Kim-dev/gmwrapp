import { ApiReturn } from "@/app/types/common/common";
import apiClient from "../common";
import { Login, User } from "@/app/types/user/user";
import Swal from 'sweetalert2';
import { userStore } from '@/stores/userStore';

export const login = async (loginData: Login) => {
    const res = await apiClient.post('/api/v1/login', {
        email: loginData.id,
        password: loginData.pwd,
    });
    const {success, data, message} = res.data as ApiReturn;

    if ( !success ) {
        Swal.fire({
            icon: "error",
            text: message
        });
    };
};

export const getUser = async (loginData: Login):Promise<User> => {
    const res = await apiClient.post('/api/v1/user');
    const {success, data, message} = res.data as ApiReturn;

    if ( !success ) {
        Swal.fire({
            icon: "error",
            text: message
        });
    }

    return data as Promise<User>;
};

export const refreshToken = async () => {
    const res = await apiClient.post('/api/v1/refreshToken');

    const {success, data, message} = res.data as ApiReturn;

    if ( !success ) {
        Swal.fire({
            icon: "error",
            text: message
        });
    };
}

export const logout = async () => {
    const initUserStore = userStore.getState().initUser;

    const res = await apiClient.post('/api/v1/logout', {});
    const {success, data, message} = res.data as ApiReturn;

    if ( !success ) {
        Swal.fire({
            icon: "error",
            text: message
        });
    };
    
    initUserStore();
};