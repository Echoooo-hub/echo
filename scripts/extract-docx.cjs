/**
 * 从 docx 提取正文，保留段落（\n\n 分隔）。
 * 运行: node scripts/extract-docx.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCX_DIR = '/Users/wangyang/Documents/Peoject/Echo的回音壁/年度阅读盘点';
const OUT_DIR = path.join(__dirname, 'extracted');

const FILES = [
  ['2021个人读书盘点(上).docx', '2021_1.txt'],
  ['2021个人读书盘点（下）.docx', '2021_2.txt'],
  ['2022读书盘点（上）.docx', '2022_1.txt'],
  ['2022读书盘点（下）.docx', '2022_2.txt'],
  ['2023年读书盘点.docx', '2023.txt'],
  ['2024年读书盘点.docx', '2024.txt'],
  ['2025年读书盘点.docx', '2025.txt'],
];

function extractText(docxPath) {
  const xml = execSync(`unzip -p ${JSON.stringify(docxPath)} word/document.xml`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const paragraphs = [];
  const wpRegex = /<w:p\b[^>]*>([\s\S]*?)<\/w:p>/gi;
  const wtRegex = /<w:t[^>]*>([\s\S]*?)<\/w:t>/gi;
  let m;
  while ((m = wpRegex.exec(xml)) !== null) {
    const frag = m[1];
    const para = frag.replace(/<w:t[^>]*>([\s\S]*?)<\/w:t>/gi, '$1').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    paragraphs.push(para);
  }
  return paragraphs.join('\n\n');
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [docxName, outName] of FILES) {
  const docxPath = path.join(DOCX_DIR, docxName);
  if (!fs.existsSync(docxPath)) {
    console.error('SKIP (not found):', docxPath);
    continue;
  }
  try {
    const text = extractText(docxPath);
    fs.writeFileSync(path.join(OUT_DIR, outName), text, 'utf8');
    console.log('OK:', docxName, '->', outName, '(' + text.length + ' chars)');
  } catch (e) {
    console.error('ERROR:', docxName, e.message);
  }
}
