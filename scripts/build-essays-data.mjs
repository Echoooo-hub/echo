/**
 * 第三步：从百字荐书提取正文（与文档格式完全一致），生成 essays 数据
 * - 支持 .docx / .doc（通过 unzip + document.xml）
 * - .pages 通过 textutil 转 txt 后读取（仅 Mac）
 * - 不做任何格式修改，仅按段落拼接为 \n\n
 * 运行: node scripts/build-essays-data.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const 百字荐书_DIR = path.join(PROJECT_ROOT, '百字荐书');
const OUT_JS = path.join(PROJECT_ROOT, 'src', 'data', 'essaysData.js');
const BOOK_COVER_MAP_PATH = path.join(PROJECT_ROOT, 'src', 'data', 'bookCoverMap.json');

const EXT_DOCX = ['.docx'];
const EXT_DOC = ['.doc'];
const EXT_PAGES = ['.pages'];

// 文件名清理（与 fetch-book-covers 一致）
const CLEAN_SUFFIXES = [
  /荐书\s*$/i, /读后\s*$/i, /总结\s*$/i,
  /\s*\(1\)\s*$/, /\s*（1）\s*$/, /\s*荐书\s*$/i,
];

/** 书名 -> 分类。未列出的归入「其他」。可根据需要增改 */
const TITLE_TO_CATEGORY = {
  '1453：君士坦丁堡之战': '大历史',
  '二战史': '大历史',
  '二战大牌局': '大历史',
  '汉尼拔战记': '大历史',
  '翦商': '大历史',
  '明朝那些事儿': '大历史',
  '南京大屠杀张纯如': '大历史',
  '威尼斯两本': '大历史',
  '推荐两本禁书': '大历史',
  '马基雅维利': '大历史',
  '瘟疫与人': '大历史',
  '我的应许之地': '大历史',
  '毛泽东传': '传记',
  '邓小平时代': '传记',
  '成为米歇尔·奥巴马': '传记',
  '温斯顿·丘吉尔': '传记',
  '硅谷钢铁侠': '传记',
  '我是女兵，也是女人': '文学',
  '人间失格': '文学',
  '一句顶一万句': '文学',
  '一百个人的十年': '文学',
  '大教堂': '文学',
  '杀死一只知更鸟': '文学',
  '看不见的城市': '文学',
  '生命不能承受之轻': '文学',
  '查令十字街84号': '文学',
  '李娟': '文学',
  '克拉拉与太阳': '文学',
  '从零到一': '经管',
  '腾讯传': '经管',
  '华为': '经管',
  '变量': '经管',
  '激荡十年，水大鱼大': '经管',
  '集装箱改变世界': '经管',
  '工作消费主义与新穷人': '经管',
  'Being Mortal': '其他',
  '最好的告别': '其他',
  '学习说话之道': '其他',
  '枪炮、病菌和钢铁': '其他',
  '自私的基因': '其他',
  '骑鲸之旅12-未写完': '其他',
};

/** 文件名/原标题 -> 展示标题（仅改展示名，正文不变） */
const TITLE_DISPLAY_OVERRIDE = {
  '南京大屠杀张纯如': '南京大屠杀',
  '推荐两本禁书': '推荐两本书',
};

/** 不纳入单篇札记的书（经管/其他等页不展示封面与内页） */
const EXCLUDE_TITLES = ['华为', '学习说话之道', 'Being Mortal', '李娟'];

function getTitleFromFilename(name) {
  const ext = path.extname(name).toLowerCase();
  let base = path.basename(name, ext).trim();
  for (const re of CLEAN_SUFFIXES) base = base.replace(re, '').trim();
  return base;
}

/** 从 docx 提取正文：按 w:p 分段，段内按 w:t 拼接，保留原文不替换空白 */
function extractDocx(docxPath) {
  const xml = execSync(`unzip -p ${JSON.stringify(docxPath)} word/document.xml`, {
    encoding: 'utf8',
    maxBuffer: 15 * 1024 * 1024,
  });
  const paragraphs = [];
  const wpRegex = /<w:p\b[^>]*>([\s\S]*?)<\/w:p>/gi;
  let m;
  while ((m = wpRegex.exec(xml)) !== null) {
    const frag = m[1];
    const text = frag
      .replace(/<w:br\s*\/?>/gi, '\n')
      .replace(/<w:t[^>]*>([\s\S]*?)<\/w:t>/gi, (_, t) => t)
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
    const para = text.trimEnd();
    if (para !== '') paragraphs.push(para);
  }
  return paragraphs.join('\n\n');
}

/** 从 .doc (OLE) 无法直接 unzip，用 textutil 转 txt（Mac） */
function extractDoc(docPath) {
  try {
    const outPath = path.join(path.dirname(docPath), `_tmp_${path.basename(docPath, '.doc')}.txt`);
    execSync(`textutil -convert txt -output ${JSON.stringify(outPath)} ${JSON.stringify(docPath)}`, { stdio: 'pipe' });
    const text = fs.readFileSync(outPath, 'utf8');
    fs.unlinkSync(outPath);
    return text.trim();
  } catch (e) {
    return '';
  }
}

/** .pages 转 txt（Mac） */
function extractPages(pagesPath) {
  try {
    const outPath = path.join(path.dirname(pagesPath), `_tmp_${path.basename(pagesPath, '.pages')}.txt`);
    execSync(`textutil -convert txt -output ${JSON.stringify(outPath)} ${JSON.stringify(pagesPath)}`, { stdio: 'pipe' });
    const text = fs.readFileSync(outPath, 'utf8');
    fs.unlinkSync(outPath);
    return text.trim();
  } catch (e) {
    return '';
  }
}

/** 百字荐书下的分类子文件夹名（与根目录五类一致） */
const CATEGORY_FOLDERS = ['大历史', '传记', '文学', '经管', '其他'];

/** 只收集根目录下的文件 */
function collectFilesFromRoot() {
  const files = [];
  if (!fs.existsSync(百字荐书_DIR)) return files;
  for (const name of fs.readdirSync(百字荐书_DIR)) {
    const full = path.join(百字荐书_DIR, name);
    if (fs.statSync(full).isDirectory()) continue;
    const ext = path.extname(name).toLowerCase();
    if (['.docx', '.doc', '.pages'].includes(ext)) files.push({ full, name, ext, category: null });
  }
  return files.sort((a, b) => a.name.localeCompare(b.name));
}

/** 收集各分类子文件夹下的文件，category 为文件夹名 */
function collectFilesFromSubfolders() {
  const files = [];
  for (const folder of CATEGORY_FOLDERS) {
    const dir = path.join(百字荐书_DIR, folder);
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) continue;
      const ext = path.extname(name).toLowerCase();
      if (['.docx', '.doc', '.pages'].includes(ext)) files.push({ full, name, ext, category: folder });
    }
  }
  return files.sort((a, b) => a.name.localeCompare(b.name));
}

function slugify(title) {
  return title
    .replace(/\s+/g, '-')
    .replace(/[：:、，。！？\s]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'essay';
}

function main() {
  const bookCoverMap = JSON.parse(fs.readFileSync(BOOK_COVER_MAP_PATH, 'utf8'));
  const essaysByCategory = { 大历史: [], 传记: [], 文学: [], 经管: [], 其他: [] };
  /** title -> { category, id, cover, content }，子文件夹条目会覆盖根目录同标题 */
  const byTitle = new Map();

  function processFile({ full, name, ext, category: folderCategory }) {
    const titleFromFile = getTitleFromFilename(name);
    if (!titleFromFile) return;
    const title = TITLE_DISPLAY_OVERRIDE[titleFromFile] || titleFromFile;
    if (EXCLUDE_TITLES.includes(titleFromFile) || EXCLUDE_TITLES.includes(title)) return;
    let content = '';
    if (ext === '.docx') content = extractDocx(full);
    else if (ext === '.doc') content = extractDoc(full);
    else if (ext === '.pages') content = extractPages(full);
    if (!content) {
      console.warn('跳过（无法提取）:', name);
      return;
    }
    const category = folderCategory != null ? folderCategory : (TITLE_TO_CATEGORY[titleFromFile] || '其他');
    const id = slugify(title) || 'essay';
    const cover = bookCoverMap[title] || bookCoverMap[titleFromFile] || null;
    byTitle.set(titleFromFile, { id, title, cover, content, category });
    console.log('OK:', title, '->', category, folderCategory != null ? '(子文件夹)' : '');
  }

  for (const file of collectFilesFromRoot()) processFile(file);
  for (const file of collectFilesFromSubfolders()) processFile(file);

  for (const article of byTitle.values()) {
    essaysByCategory[article.category].push({
      id: article.id,
      title: article.title,
      cover: article.cover,
      content: article.content,
    });
  }
  for (const cat of CATEGORY_FOLDERS) {
    essaysByCategory[cat].sort((a, b) => a.title.localeCompare(b.title));
  }

  const out = `/**
 * 单篇札记文章数据（由 scripts/build-essays-data.mjs 生成，请勿手改）
 * 内容与文件夹中文档完全一致，未做任何修改。
 */
export const essaysByCategory = ${JSON.stringify(essaysByCategory, null, 2)};
`;

  fs.writeFileSync(OUT_JS, out, 'utf8');
  console.log('\n已写入:', OUT_JS);
}

main();
