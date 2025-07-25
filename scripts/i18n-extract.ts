// scripts/extract-i18n.ts
import fs from 'fs-extra';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import type { NodePath } from '@babel/traverse';
import glob from 'fast-glob';
import * as t from '@babel/types';

// ✅ Trích xuất các key từ file sử dụng t("...")
const extractKeysFromFile = (filePath: string): string[] => {
  const content = fs.readFileSync(filePath, 'utf8');
  const ast = parse(content, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const keys: string[] = [];

  traverse(ast, {
    CallExpression(path: NodePath<t.CallExpression>) {
      const node = path.node;
      if (
        node.callee.type === 'Identifier' &&
        node.callee.name === 't' &&
        node.arguments.length > 0 &&
        node.arguments[0].type === 'StringLiteral'
      ) {
        keys.push(node.arguments[0].value);
      }
    },
  });

  return keys;
};

// ✅ Ghi file en.json và vi.json
const writeLocaleFiles = (filePath: string, keys: string[]) => {
  const dir = path.resolve('public/locales/common'); // hoặc chỗ bạn để JSON
  const enPath = path.join(dir, 'en.json');
  const viPath = path.join(dir, 'vi.json');

  const en: Record<string, string> = fs.existsSync(enPath) ? fs.readJsonSync(enPath) : {};
  const vi: Record<string, string> = fs.existsSync(viPath) ? fs.readJsonSync(viPath) : {};

  keys.forEach((key) => {
    if (!en[key]) en[key] = key;
    if (!vi[key]) vi[key] = key;
  });

  fs.writeJsonSync(enPath, en, { spaces: 2 });
  fs.writeJsonSync(viPath, vi, { spaces: 2 });
};

// ✅ Thực thi
const run = async () => {
  const files = await glob(['src/**/*.{ts,tsx}'], {
    ignore: ['**/*.test.*', '**/node_modules/**'],
  });

  for (const file of files) {
    const keys = extractKeysFromFile(file);
    if (keys.length > 0) {
      writeLocaleFiles(file, keys);
      console.log(`✅ Extracted keys from: ${file}`);
    }
  }
};

run().catch((err) => {
  console.error('❌ Error extracting i18n keys:', err);
});
