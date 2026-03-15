# 书籍封面图片

## 自动抓取

- 脚本：`scripts/fetch-book-covers.mjs`
- 运行：`node scripts/fetch-book-covers.mjs`
- 来源：优先豆瓣读书，封面保存为 `{豆瓣subject id}.jpg`（如 `26929955.jpg`）
- 书名与路径的对应关系在 `src/data/bookCoverMap.json`

## 手动替换 / 补充

1. **替换某本书的封面**  
   在 `src/data/bookCoverMap.json` 里找到该书对应的路径，例如：  
   `"腾讯传": "/images/book-covers/26929955.jpg"`  
   把正确封面图片放到本目录下，文件名保持为 `26929955.jpg`（覆盖原文件即可），保存后刷新页面即可生效。

2. **为新书或抓取失败的书添加封面**  
   - 将图片放到本目录 `public/images/book-covers/` 下。  
   - 文件名建议：用英文或拼音，如 `huozhe.jpg`、`nanjingdatusha.jpg`，避免中文和特殊字符。  
   - 在 `src/data/bookCoverMap.json` 中增加一条：  
     `"书名": "/images/book-covers/你起的文件名.jpg"`  
   书名需与文章/列表里使用的书名一致，保存后刷新即可。

3. **暂无封面**  
   未在 `bookCoverMap.json` 中配置的书会使用占位图（灰色「暂无封面」）。
