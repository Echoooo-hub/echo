import React from 'react';
import { useNavigate } from 'react-router-dom';
import { essayCategories } from '../data/essayCategories';

const EssayHome = () => {
  const navigate = useNavigate();

  return (
    <section className="essay-home">
      <div className="container">
        <h2 className="section-title">单篇札记（2020年及以前）</h2>
        <p className="section-desc">按分类浏览书评与札记</p>
        <div className="essay-categories-grid">
          {essayCategories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className="essay-category-card"
              onClick={() => navigate(`/essays/${cat.slug}`)}
            >
              <span className="essay-category-name">{cat.displayName}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EssayHome;
