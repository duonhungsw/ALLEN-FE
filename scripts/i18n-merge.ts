import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';

const mergeLocaleFiles = async () => {
  const en: Record<string, string> = {};
  const vi: Record<string, string> = {};

  const enFiles = await glob(['src/**/en.json']);
  const viFiles = await glob(['src/**/vi.json']);

  for (const file of enFiles) {
    const content = await fs.readJson(file);
    Object.assign(en, content);
  }

  for (const file of viFiles) {
    const content = await fs.readJson(file);
    Object.assign(vi, content);
  }

  await fs.ensureDir('locales/en');
  await fs.ensureDir('locales/vi');
  await fs.writeJson('locales/en/common.json', en, { spaces: 2 });
  await fs.writeJson('locales/vi/common.json', vi, { spaces: 2 });

  console.log('✅ Merged locale files to locales/en/common.json and locales/vi/common.json');
};

mergeLocaleFiles();
