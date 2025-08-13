import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/shared/api/auth.api';
import { clearAllAuthData } from '@/shared/store';
import { logout as logoutAction } from '@/providers/auth/reducer/authSlice';
import { toast } from 'sonner';
import { AppDispatch } from '@/providers/store';

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
    onError: (error) => {
      dispatch(logoutAction());
      clearAllAuthData();
      toast.error('Đăng xuất thất bại, nhưng đã xóa dữ liệu local');
      router.push('/login');
    },
  });
};
