import { ApiReturn } from '@/app/types/common/common';
import { initUserData, Login, User } from '@/app/types/user/user';
import Swal from 'sweetalert2';
import { userStore } from '@/stores/userStore';
import apiClient from './apiClient';

export const login = async (loginData: Login) => {
  try {
    const res = await apiClient.post('/api/auth/login', {
      email: loginData.id,
      password: loginData.pwd,
    });

    const { success, message } = res.data as ApiReturn;

    if (!success) {
      Swal.fire({ icon: 'error', text: message });
    }

    return success;
  } catch {
    throw new Error('로그인 실패하였습니다.');
  }
};

export const getUser = async (): Promise<User> => {
  const res = await apiClient.get('/api/auth/user');
  const { success, data, message } = res.data as ApiReturn;

  if (!success) {
    Swal.fire({ icon: 'error', text: message });
  }

  return (data || initUserData) as User;
};

export const logout = async () => {
  const initUserStore = userStore.getState().initUser;

  const res = await apiClient.post('/api/auth/logout');
  const { success, message } = res.data as ApiReturn;

  if (!success) {
    Swal.fire({ icon: 'error', text: message });
  }

  initUserStore();
};

export const register = async (data: Record<string, string>) => {
  const res = await apiClient.post('/api/auth/register', data);
  const { success, message } = res.data as ApiReturn;

  if (!success) {
    Swal.fire({ icon: 'error', text: message });
  }

  return success;
};
