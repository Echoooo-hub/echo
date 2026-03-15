import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryBySlug, essaysByCategory } from '../data/essayCategories';

const EssayArticleDetail = () => {
  const { categorySlug, articleId } = useParams();
  const navigate = useNavigate();
  const category = getCategoryBySlug(categorySlug);
  const articles = category ? essaysByCategory[category.folderKey] || [] : [];
  const article = articles.find((a) => String(a.id) === String(articleId));

  if (!category) {
    return (
      <section className="essay-article-detail">
        <div className="container">
          <p>分类不存在</p>
          <button type="button" onClick={() => navigate('/essays')}>返回单篇札记首页</button>
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="essay-article-detail">
        <div className="container">
          <p>文章不存在</p>
          <button type="button" onClick={() => navigate(`/essays/${categorySlug}`)}>返回分类列表</button>
        </div>
      </section>
    );
  }

  return (
    <article className="essay-article-detail">
      <div className="container">
        <nav className="essay-breadcrumb">
          <button type="button" onClick={() => navigate('/essays')}>单篇札记</button>
          <span className="breadcrumb-sep">/</span>
          <button type="button" onClick={() => navigate(`/essays/${categorySlug}`)}>{category.displayName}</button>
          <span className="breadcrumb-sep">/</span>
          <span>{article.title}</span>
        </nav>
        <header className="essay-article-header">
          <h1 className="essay-article-title">{article.title}</h1>
          {article.cover && (
            <div className="essay-article-cover">
              <img src={article.cover} alt={article.title} />
            </div>
          )}
        </header>
        <div className="essay-article-body">
          {article.content ? (
            article.content.split(/\n\n+/).map((para, i) => (
              <p key={i}>
                {para.split('\n').map((line, j) => (
                  <React.Fragment key={j}>
                    {line}
                    {j < para.split('\n').length - 1 ? <br /> : null}
                  </React.Fragment>
                ))}
              </p>
            ))
          ) : (
            <p className="essay-empty-tip">文章内容将在后续步骤中填充。</p>
          )}
        </div>
        <div className="essay-article-actions">
          <button type="button" onClick={() => navigate(`/essays/${categorySlug}`)}>返回列表</button>
        </div>
      </div>
    </article>
  );
};

export default EssayArticleDetail;
