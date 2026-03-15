#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从 docx 提取正文，保留段落（每段一行，段与段之间空行）。"""
import zipfile
import xml.etree.ElementTree as ET
import sys
import os

NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

def extract_text(docx_path):
    with zipfile.ZipFile(docx_path, 'r') as z:
        xml_content = z.read('word/document.xml')
    root = ET.fromstring(xml_content)
    body = root.find('w:body', NS)
    if body is None:
        return ''
    paragraphs = []
    for p in body.findall('w:p', NS):
        texts = []
        for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
            if t.text:
                texts.append(t.text)
            if t.tail:
                texts.append(t.tail)
        line = ''.join(texts).strip()
        paragraphs.append(line)
    # 段与段之间用两个换行连接（保留空行表示分段）
    return '\n\n'.join(paragraphs)

if __name__ == '__main__':
    docx_dir = sys.argv[1] if len(sys.argv) > 1 else '/Users/wangyang/Documents/Peoject/Echo的回音壁/年度阅读盘点'
    out_dir = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(docx_dir), 'extracted')
    os.makedirs(out_dir, exist_ok=True)
    mapping = [
        ('2021个人读书盘点(上).docx', '2021_1.txt'),
        ('2021个人读书盘点（下）.docx', '2021_2.txt'),
        ('2022读书盘点（上）.docx', '2022_1.txt'),
        ('2022读书盘点（下）.docx', '2022_2.txt'),
        ('2023年读书盘点.docx', '2023.txt'),
        ('2025年读书盘点.docx', '2025.txt'),
    ]
    for docx_name, out_name in mapping:
        path = os.path.join(docx_dir, docx_name)
        if not os.path.exists(path):
            print('SKIP (not found):', path, file=sys.stderr)
            continue
        try:
            text = extract_text(path)
            out_path = os.path.join(out_dir, out_name)
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(text)
            print('OK:', docx_name, '->', out_name, '(%d chars)' % len(text))
        except Exception as e:
            print('ERROR:', docx_name, e, file=sys.stderr)
