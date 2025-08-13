import { setUser } from '@/providers/auth/reducer/authSlice';
import { AppDispatch } from '@/providers/store';
import { logout as logoutAction } from '@/providers/auth/reducer/authSlice';
import { login } from '@/shared/api/auth.api';
import { clearAllAuthData, setStorageData } from '@/shared/store';
import { extractErrorMessage } from '@/utils/ErrorHandle';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/shared/api/auth.api';

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.userInfo) setStorageData('user', data.userInfo);
      setStorageData('accessToken', data.accessToken);
      setStorageData('refreshToken', data.refreshToken);
      dispatch(setUser(data.userInfo));
      toast.success('Login Successfully');
      router.push('/');
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(logoutAction());
      clearAllAuthData();
      toast.success('Đăng xuất thành công!');
      router.push('/login');
    },
    onError: () => {
      dispatch(logoutAction());
      clearAllAuthData();
      toast.success('Đăng xuất thành công, nhưng đã xóa dữ liệu local');
      router.push('/login');
    },
  });
};