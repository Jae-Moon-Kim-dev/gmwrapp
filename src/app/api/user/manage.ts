import { ApiReturn } from "@/app/types/common/common";
import apiClient from "../common";
import { Login, User } from "@/app/types/user/user";
import Swal from 'sweetalert2';

export const login = async (loginData: Login):Promise<User> => {
    await apiClient.get('/sanctum/csrf-cookie');

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
    }

    return data as Promise<User>;
};

export const logout = async () => {
    const res = await apiClient.post('/api/v1/logout', {});
    const {success, data, message} = res.data as ApiReturn;

    if ( !success ) {
        Swal.fire({
            icon: "error",
            text: message
        });
    };
};