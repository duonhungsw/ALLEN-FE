# JWT Authentication System - Frontend Implementation

## Tổng quan

Hệ thống xác thực JWT đã được triển khai đầy đủ với các tính năng:

- ✅ Đăng nhập và lưu trữ tokens
- ✅ Tự động gửi access token trong headers
- ✅ Tự động refresh token khi hết hạn
- ✅ Retry requests sau khi refresh thành công
- ✅ Quản lý trạng thái xác thực với Redux
- ✅ Bảo vệ routes cần xác thực
- ✅ Xử lý logout và xóa tokens

## Cấu trúc Files

### 1. Types & Interfaces
```
src/providers/auth/types/authType.ts
├── UserInfo - Thông tin người dùng
├── AuthTokens - JWT tokens
├── LoginResponse - Response từ API login
└── AuthState - State của Redux store
```

### 2. Redux Store
```
src/providers/auth/reducer/authSlice.ts
├── loginSuccess - Xử lý đăng nhập thành công
├── refreshTokenSuccess - Cập nhật token mới
├── logout - Xóa thông tin xác thực
└── setError - Xử lý lỗi
```

### 3. API Layer
```
src/shared/api/index.ts
├── Axios instance với interceptors
├── Tự động thêm Authorization header
├── Tự động refresh token khi 401
└── Retry requests sau refresh
```

### 4. Hooks
```
src/hooks/auth/
├── useLogin.ts - Xử lý đăng nhập
├── useLogout.ts - Xử lý đăng xuất
├── useProfile.ts - Quản lý profile
└── useAuth.ts - Kiểm tra trạng thái xác thực
```

### 5. Components
```
src/components/common/
└── ProtectedRoute.tsx - Bảo vệ routes cần xác thực
```

## Cách sử dụng

### 1. Đăng nhập
```tsx
import { useLogin } from "@/hooks/auth/useLogin";

const LoginComponent = () => {
  const loginMutation = useLogin();
  
  const handleLogin = (email: string, password: string) => {
    loginMutation.mutate({
      email,
      password,
      remember: true
    });
  };
  
  return (
    <button 
      onClick={() => handleLogin("user@example.com", "password")}
      disabled={loginMutation.isPending}
    >
      {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
    </button>
  );
};
```

### 2. Bảo vệ Route
```tsx
import ProtectedRoute from "@/components/common/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div>Dashboard content - chỉ hiển thị khi đã đăng nhập</div>
    </ProtectedRoute>
  );
};
```

### 3. Kiểm tra trạng thái xác thực
```tsx
import { useAuth } from "@/hooks/auth/useAuth";

const HeaderComponent = () => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <header>
      {isAuthenticated ? (
        <div>
          <span>Xin chào, {user?.fullName}</span>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </header>
  );
};
```

### 4. Đăng xuất
```tsx
import { useLogout } from "@/hooks/auth/useLogout";

const LogoutButton = () => {
  const logoutMutation = useLogout();
  
  return (
    <button 
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? "Đang đăng xuất..." : "Đăng xuất"}
    </button>
  );
};
```

## Luồng hoạt động

### 1. Đăng nhập
```
User submit form → API POST /auth/login → 
Lưu tokens vào localStorage → 
Cập nhật Redux store → 
Redirect to dashboard
```

### 2. Request với Authentication
```
API request → Axios interceptor thêm Authorization header → 
Backend xử lý → Response
```

### 3. Token Expired
```
API request → 401 Unauthorized → 
Axios interceptor phát hiện → 
Gọi API refresh token → 
Cập nhật access token → 
Retry original request
```

### 4. Logout
```
User click logout → API POST /auth/logout → 
Xóa tokens khỏi localStorage → 
Clear Redux store → 
Redirect to login
```

## Cấu hình

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### API Endpoints
```typescript
// src/shared/constants/apiConstants.ts
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  // ...
};
```

## Xử lý lỗi

### 1. Network Errors
- Tự động retry với exponential backoff
- Hiển thị thông báo lỗi thân thiện

### 2. Authentication Errors
- 401: Tự động refresh token
- 403: Redirect to login
- Token invalid: Clear local data

### 3. Refresh Token Failed
- Clear tất cả tokens
- Redirect to login page
- Hiển thị thông báo "Phiên đăng nhập đã hết hạn"

## Bảo mật

### 1. Token Storage
- Access token: localStorage (có thể thay bằng httpOnly cookie)
- Refresh token: localStorage (có thể thay bằng httpOnly cookie)

### 2. Token Expiration
- Access token: 15-60 phút
- Refresh token: 7-30 ngày
- Tự động refresh trước khi hết hạn

### 3. CSRF Protection
- Sử dụng withCredentials: true
- Backend cần implement CSRF token

## Testing

### 1. Unit Tests
```bash
npm run test:unit
```

### 2. Integration Tests
```bash
npm run test:integration
```

### 3. E2E Tests
```bash
npm run test:e2e
```

## Troubleshooting

### 1. Token không được gửi
- Kiểm tra localStorage có tokens không
- Kiểm tra Axios interceptor
- Kiểm tra Authorization header

### 2. Refresh token loop
- Kiểm tra logic refresh token
- Kiểm tra response format từ backend
- Kiểm tra token expiration

### 3. Logout không hoạt động
- Kiểm tra API endpoint
- Kiểm tra localStorage clearing
- Kiểm tra Redux state

## Tài liệu tham khảo

- [JWT.io](https://jwt.io/)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/query/latest)
