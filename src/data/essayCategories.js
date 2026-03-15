/**
 * 单篇札记分类配置
 * folderKey: 对应根目录下文件夹名（大历史、传记、文学、经管、其他）
 * slug: URL 用英文标识
 * displayName: 首页及导航展示名称
 */
export const essayCategories = [
  { folderKey: '大历史', slug: 'dashi', displayName: '大历史' },
  { folderKey: '传记', slug: 'zhuanji', displayName: '传记' },
  { folderKey: '文学', slug: 'wenxue', displayName: '文学' },
  { folderKey: '经管', slug: 'jingguan', displayName: '经管' },
  { folderKey: '其他', slug: 'qita', displayName: '其他' },
];

/** 按 slug 查找分类 */
export function getCategoryBySlug(slug) {
  return essayCategories.find((c) => c.slug === slug) || null;
}

/** 各分类下的文章列表（来自 essaysData，由 scripts/build-essays-data.mjs 生成） */
export { essaysByCategory } from './essaysData';
