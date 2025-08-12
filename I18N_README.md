# Hệ thống i18n (Internationalization)

## Tổng quan
Dự án sử dụng hệ thống i18n với 2 ngôn ngữ: Tiếng Việt (vi) và English (en).

## Cách hoạt động

### 1. Trích xuất keys (npm run i18n)
```bash
npm run i18n
```
- Script sẽ quét tất cả file `.tsx` và `.ts` trong thư mục `src/`
- Tìm các lời gọi `t("key")` và trích xuất keys
- Tạo file `en.json` và `vi.json` trong mỗi thư mục component/app tương ứng
- Keys mới sẽ được thêm với giá trị mặc định là key đó

### 2. Merge và build (npm run dev)
```bash
npm run dev
```
- Tự động chạy `npm run i18n:merge` trước khi khởi động dev server
- Script merge sẽ gộp tất cả file `en.json` và `vi.json` từ `src/`
- Tạo file `public/locales/en/common.json` và `public/locales/vi/common.json`
- Web app sẽ load translations từ các file này

### 3. Merge thủ công (nếu cần)
```bash
npm run i18n:merge
```

## Cấu trúc file

```
src/
├── components/
│   ├── NavBar/
│   │   ├── en.json          # Keys cho NavBar (English)
│   │   ├── vi.json          # Keys cho NavBar (Tiếng Việt)
│   │   └── NavBar.tsx
│   └── ...
├── app/
│   ├── home/
│   │   ├── en.json          # Keys cho home page
│   │   ├── vi.json          # Keys cho home page
│   │   └── page.tsx
│   └── ...
└── ...

public/
└── locales/
    ├── en/
    │   └── common.json      # Tất cả keys English (được merge)
    └── vi/
        └── common.json      # Tất cả keys Tiếng Việt (được merge)
```

## Cách sử dụng trong code

### 1. Import hook
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome_message')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### 2. Keys sẽ được tự động thêm vào file JSON
Khi chạy `npm run i18n`, các keys `welcome_message` và `description` sẽ được thêm vào:
- `src/components/MyComponent/en.json`
- `src/components/MyComponent/vi.json`

### 3. Cập nhật giá trị
Sau đó bạn có thể chỉnh sửa giá trị trong các file JSON:
```json
// en.json
{
  "welcome_message": "Welcome to our app!",
  "description": "This is a great application"
}

// vi.json
{
  "welcome_message": "Chào mừng đến với ứng dụng!",
  "description": "Đây là một ứng dụng tuyệt vời"
}
```

## Quy trình làm việc

1. **Phát triển**: Viết code với `t("key")`
2. **Trích xuất**: Chạy `npm run i18n` để tạo file JSON
3. **Dịch thuật**: Chỉnh sửa giá trị trong file `vi.json` và `en.json`
4. **Chạy app**: `npm run dev` sẽ tự động merge và build
5. **Kiểm tra**: Web app sẽ hiển thị đúng ngôn ngữ

## Lưu ý

- Luôn sử dụng `t("key")` thay vì hardcode text
- Keys nên có ý nghĩa và dễ hiểu
- Chạy `npm run i18n` mỗi khi thêm keys mới
- File `public/locales/` được tạo tự động, không chỉnh sửa trực tiếp 