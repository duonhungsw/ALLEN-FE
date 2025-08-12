import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';

const mergeLocaleFiles = async () => {
  console.log('🔄 Starting i18n merge process...');
  
  const en: Record<string, string> = {};
  const vi: Record<string, string> = {};

  // Tìm tất cả file en.json và vi.json trong src
  const enFiles = await glob(['src/**/en.json']);
  const viFiles = await glob(['src/**/vi.json']);

  console.log(`📁 Found ${enFiles.length} en.json files`);
  console.log(`📁 Found ${viFiles.length} vi.json files`);

  // Merge tất cả file en.json
  for (const file of enFiles) {
    const content = await fs.readJson(file);
    Object.assign(en, content);
    console.log(`📝 Merged: ${file}`);
  }

  // Merge tất cả file vi.json
  for (const file of viFiles) {
    const content = await fs.readJson(file);
    Object.assign(vi, content);
    console.log(`📝 Merged: ${file}`);
  }

  // Tạo thư mục public/locales
  await fs.ensureDir('public/locales/en');
  await fs.ensureDir('public/locales/vi');
  
  // Ghi file common.json
  await fs.writeJson('public/locales/en/common.json', en, { spaces: 2 });
  await fs.writeJson('public/locales/vi/common.json', vi, { spaces: 2 });

  console.log(`\n✅ Merged ${Object.keys(en).length} English keys to public/locales/en/common.json`);
  console.log(`✅ Merged ${Object.keys(vi).length} Vietnamese keys to public/locales/vi/common.json`);
  console.log('🎉 i18n merge completed!');
};

mergeLocaleFiles().catch((err) => {
  console.error('❌ Error merging locale files:', err);
  process.exit(1);
});
