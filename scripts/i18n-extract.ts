// scripts/i18n-extract.ts
import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';

// ✅ Trích xuất các key từ file sử dụng t("...")
const extractKeysFromFile = (filePath: string): string[] => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Regex để tìm t("key") hoặc t('key') - chỉ lấy text keys
  const regex = /t\(\s*['"`]([^'"`${}\s]+(?:[\s-][^'"`${}\s]+)*)['"`]\s*\)/g;
  const keys: string[] = [];
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    // Loại bỏ các keys không phải text (có chứa $, {}, hoặc quá ngắn)
    if (key && !key.includes('$') && !key.includes('{') && key.length > 1) {
      keys.push(key);
    }
  }
  
  return keys;
};

// ✅ Ghi file en.json và vi.json vào thư mục tương ứng
const writeLocaleFiles = (filePath: string, keys: string[]) => {
  // Lấy đường dẫn tương đối từ src
  const relativePath = path.relative('src', filePath);
  const dir = path.dirname(path.join('src', relativePath));
  
  const enPath = path.join(dir, 'en.json');
  const viPath = path.join(dir, 'vi.json');

  // Đọc file hiện tại nếu có
  const en: Record<string, string> = fs.existsSync(enPath) ? fs.readJsonSync(enPath) : {};
  const vi: Record<string, string> = fs.existsSync(viPath) ? fs.readJsonSync(viPath) : {};

  // Thêm keys mới
  keys.forEach((key) => {
    if (!en[key]) en[key] = key;
    if (!vi[key]) vi[key] = key;
  });

  // Đảm bảo thư mục tồn tại
  fs.ensureDirSync(path.dirname(enPath));
  
  // Ghi file
  fs.writeJsonSync(enPath, en, { spaces: 2 });
  fs.writeJsonSync(viPath, vi, { spaces: 2 });
  
  console.log(`✅ Updated: ${enPath} and ${viPath}`);
};

// ✅ Thực thi
const run = async () => {
  console.log('🔍 Scanning for i18n keys...');
  
  const files = await glob(['src/**/*.{ts,tsx}'], {
    ignore: ['**/*.test.*', '**/node_modules/**', '**/*.json'],
  });

  let totalKeys = 0;
  
  for (const file of files) {
    const keys = extractKeysFromFile(file);
    if (keys.length > 0) {
      writeLocaleFiles(file, keys);
      totalKeys += keys.length;
      console.log(`📝 Extracted ${keys.length} keys from: ${file}`);
    }
  }
  
  console.log(`\n🎉 Total keys extracted: ${totalKeys}`);
  console.log('✅ i18n extraction completed!');
};

run().catch((err) => {
  console.error('❌ Error extracting i18n keys:', err);
  process.exit(1);
});
