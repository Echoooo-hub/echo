/**
 * 第二步：批量抓取书籍封面
 * - 从「百字荐书」目录收集书名（文件名去后缀并清理）
 * - 优先豆瓣 subject_suggest 获取封面 URL，下载到 public/images/book-covers/
 * - 文件名使用豆瓣 subject id（如 26929955.jpg），并输出 title->filename 映射供第三步使用
 * 运行: node scripts/fetch-book-covers.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const 百字荐书_DIR = path.join(PROJECT_ROOT, '百字荐书');
const OUT_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'book-covers');
const MAPPING_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'bookCoverMap.json');

const EXTENSIONS = ['.docx', '.doc', '.pages'];
const CLEAN_SUFFIXES = [
  /荐书\s*$/i, /读后\s*$/i, /总结\s*$/i,
  /\s*\(1\)\s*$/, /\s*（1）\s*$/, /\s*荐书\s*$/i,
];

function getBookTitles() {
  const titles = new Set();
  if (!fs.existsSync(百字荐书_DIR)) {
    console.warn('百字荐书目录不存在:', 百字荐书_DIR);
    return [];
  }
  for (const name of fs.readdirSync(百字荐书_DIR)) {
    const full = path.join(百字荐书_DIR, name);
    if (fs.statSync(full).isDirectory()) continue;
    const ext = path.extname(name).toLowerCase();
    if (!EXTENSIONS.includes(ext)) continue;
    let base = path.basename(name, ext).trim();
    for (const re of CLEAN_SUFFIXES) base = base.replace(re, '').trim();
    if (base.length > 0) titles.add(base);
  }
  return [...titles].sort();
}

function doubanSuggest(q) {
  const url = `https://book.douban.com/j/subject_suggest?q=${encodeURIComponent(q)}`;
  return fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json',
    },
  }).then((r) => r.json());
}

function downloadImage(url, outPath) {
  return fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Referer': 'https://book.douban.com/',
    },
  }).then((r) => r.arrayBuffer()).then((buf) => {
    fs.writeFileSync(outPath, Buffer.from(buf));
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const titles = getBookTitles();
  console.log('共发现书名:', titles.length);
  console.log(titles.join(', '));

  const mapping = {};
  let ok = 0;
  let fail = 0;

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    const outPathById = (id) => path.join(OUT_DIR, `${id}.jpg`);
    try {
      const list = await doubanSuggest(title);
      const first = Array.isArray(list) && list[0];
      if (!first || !first.pic) {
        console.log(`[跳过] ${title} - 豆瓣无结果`);
        fail++;
        await sleep(800);
        continue;
      }
      const id = first.id || first.url?.match(/subject\/(\d+)/)?.[1];
      if (!id) {
        console.log(`[跳过] ${title} - 无 id`);
        fail++;
        await sleep(800);
        continue;
      }
      const dest = outPathById(id);
      await downloadImage(first.pic, dest);
      mapping[title] = `/images/book-covers/${id}.jpg`;
      console.log(`[OK] ${title} -> ${id}.jpg`);
      ok++;
    } catch (e) {
      console.log(`[失败] ${title} - ${e.message}`);
      fail++;
    }
    await sleep(1000);
  }

  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), 'utf8');
  console.log('\n完成. 成功:', ok, '失败:', fail);
  console.log('封面目录:', OUT_DIR);
  console.log('书名->封面路径映射已写入:', MAPPING_FILE);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
