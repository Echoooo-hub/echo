import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryBySlug, essaysByCategory } from '../data/essayCategories';

const EssayCategoryList = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const category = getCategoryBySlug(categorySlug);
  const articles = category ? essaysByCategory[category.folderKey] || [] : [];

  if (!category) {
    return (
      <section className="essay-category-list">
        <div className="container">
          <p>分类不存在</p>
          <button type="button" onClick={() => navigate('/essays')}>返回单篇札记首页</button>
        </div>
      </section>
    );
  }

  return (
    <section className="essay-category-list">
      <div className="container">
        <nav className="essay-breadcrumb">
          <button type="button" onClick={() => navigate('/essays')}>单篇札记</button>
          <span className="breadcrumb-sep">/</span>
          <span>{category.displayName}</span>
        </nav>
        <h2 className="section-title">{category.displayName}</h2>
        <div className="essay-list-grid">
          {articles.length === 0 ? (
            <p className="essay-empty-tip">该分类下暂无文章，后续会在此展示书评列表与封面。</p>
          ) : (
            articles.map((article) => (
              <button
                key={article.id}
                type="button"
                className="essay-card"
                onClick={() => navigate(`/essays/${categorySlug}/${article.id}`)}
              >
                <div className="essay-card-cover">
                  <img src={article.cover || '/images/book-covers/placeholder.svg'} alt={article.title} />
                </div>
                <h3 className="essay-card-title">{article.title}</h3>
              </button>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default EssayCategoryList;
