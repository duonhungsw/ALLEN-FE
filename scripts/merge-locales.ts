import fs from 'fs';
import path from 'path';

const locales = ['en', 'vi'];
const srcDirs = [
  path.join(__dirname, '../src/components'),
  path.join(__dirname, '../src/app'),
];
const outputDir = path.join(__dirname, '../public/locales');

function walkFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walkFiles(fullPath));
    } else if (/\.(tsx|ts)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

function extractKeysFromFile(content: string): string[] {
  const regex = /t\(\s*['"`]{1}([^'"`]+)['"`]{1}\s*\)/g;
  const keys: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
  }
  return keys;
}

function extractAndGenerate() {
  const keySet = new Set<string>();

  srcDirs.forEach(dir => {
    walkFiles(dir).forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      const keys = extractKeysFromFile(content);
      keys.forEach(k => keySet.add(k));
    });
  });

  locales.forEach(locale => {
    const localeFile = path.join(outputDir, locale, 'common.json');
    const existing = fs.existsSync(localeFile)
      ? JSON.parse(fs.readFileSync(localeFile, 'utf-8'))
      : {};

    const newData: Record<string, string> = {};

    keySet.forEach(key => {
      if (!(key in existing)) {
        newData[key] = key; // cả en và vi đều lấy key làm value ban đầu
      }
    });

    const merged = { ...existing, ...newData };
    fs.mkdirSync(path.dirname(localeFile), { recursive: true });
    fs.writeFileSync(localeFile, JSON.stringify(merged, null, 2), 'utf-8');
    console.log(`✅ Generated ${locale}/common.json`);
  });
}

extractAndGenerate();
