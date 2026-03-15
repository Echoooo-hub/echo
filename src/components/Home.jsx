import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { essayCategories } from '../data/essayCategories';

const Home = ({ reviews = [], onReviewClick, onViewAllClick, onViewMessagesClick }) => {
  const [photosExpanded, setPhotosExpanded] = useState(false);
  const navigate = useNavigate();

  // 首页只显示最近 3 篇年度盘点，摘要为每篇开头 150-200 字（来自 data）
  // 2025 标题固定为「2025年读书盘点」（不含「（上）」）
  const recentReviews = (reviews && reviews.length >= 3)
    ? reviews.slice(0, 3).map(({ id, year, title, excerpt }) => ({
        id, year, excerpt,
        title: id === '2025' ? '2025年读书盘点' : title,
      }))
    : [];

  // 留言板：首页仅展示入口，留言列表在留言板页
  const messages = [];

  return (
    <div className="home">
      {/* 个人介绍板块 */}
      <section className="home-intro-section">
        <div className="container">
          <div className="home-intro">
            <div className="intro-header">
              <div className="profile-avatar">
                <img src="/photos/profile-photo.jpg" alt="Echo Fu" />
              </div>
              <h1>Echo Fu · 回声</h1>
              <p className="welcome-text">你好呀，欢迎来到我的回音壁👋</p>
            </div>
            
            <div className="intro-content">
              <p>
                80后，绍兴人，定居北京<br />
                十年外企公关人<br />
                <br />
                爱读书、爱思考、爱写字，写得自己开心就好——说我不会创作？也对；<br />
                <br />
                年纪越大越爱玩，蹦极潜水上天入海—— work hard, play hard ；<br />
                <br />
                一个矛盾结合体，想搞个网站又担心隐私，那就放这十年写的文章吧
              </p>
              
              <div className="tags-section">
                <h3>哦对了，还有这些：</h3>
                <div className="tags-list">
                  <span className="tag">📚 集齐三所大学的校友（人大/对外经贸/麦考瑞）</span>
                  <span className="tag">👧 真心希望孩子成绩别太好的妈妈（鸡娃不如鸡自己）</span>
                  <span className="tag">🏠 妻子+家庭主理人（这两工种往往合并，KPI比较主观：个人幸福感 + 成员满意度）</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 照片展示 */}
          <div className="photos-section">
            <h3 className="photos-title">上天·入海·人间</h3>
            <div className="photo-gallery">
              <div className="gallery-item large">
                <img src="/photos/bungee.jpg" alt="蹦极" />
                <div className="gallery-overlay">
                  <span>蹦极</span>
                </div>
              </div>
              <div className="gallery-item small">
                <img src="/photos/dive.jpg" alt="潜水" />
                <div className="gallery-overlay">
                  <span>潜水</span>
                </div>
              </div>
              <div className="gallery-item medium">
                <img src="/photos/work.jpg" alt="工作场景" />
                <div className="gallery-overlay">
                  <span>工作</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 年度读书盘点预览 */}
      <section className="annual-preview-section">
        <div className="container">
          <h2 className="section-title">年度读书盘点</h2>
          <div className="review-list">
            {recentReviews.map((review) => (
              <div key={review.year} className="review-item">
                <h3>{review.title}</h3>
                <p>{review.excerpt}</p>
                <a href="#" className="review-link" onClick={() => onReviewClick(review.id)}>阅读全文</a>
              </div>
            ))}
          </div>
          <div className="view-all-link">
            <a href="#" className="review-link" onClick={onViewAllClick}>查看全部年度盘点</a>
          </div>
        </div>
      </section>

      {/* 单篇札记（2020年及以前）— 五分类入口 */}
      <section className="books-preview-section essay-categories-section">
        <div className="container">
          <h2 className="section-title">单篇札记（2020年及以前）</h2>
          <div className="essay-categories-grid">
            {essayCategories.map((cat) => (
              <a
                key={cat.slug}
                href={`/essays/${cat.slug}`}
                className="essay-category-card"
                onClick={(e) => { e.preventDefault(); navigate(`/essays/${cat.slug}`); }}
              >
                <span className="essay-category-name">{cat.displayName}</span>
              </a>
            ))}
          </div>
          <div className="view-all-link">
            <a href="/essays" className="review-link" onClick={(e) => { e.preventDefault(); navigate('/essays'); }}>查看全部单篇札记</a>
          </div>
        </div>
      </section>

      {/* 网站最下方：公众号二维码 + 留言板入口 */}
      <section className="home-bottom-section">
        <div className="container home-bottom-container">
          <div className="home-bottom-qr">
            {/* 将公众号二维码图片保存为 public/images/wechat-qr.png 即可显示 */}
            <img src="/images/wechat-qr.png" alt="读书会公众号二维码" className="home-qr-img" onError={(e) => { e.target.onerror = null; e.target.src = '/images/wechat-qr.svg'; }} />
            <p className="home-qr-caption">欢迎关注现在偶尔运营的读书会公众号</p>
          </div>
          <div className="home-bottom-messages">
            <h2 className="home-bottom-title">留言板</h2>
            <div className="home-messages-placeholder">
              {messages.length === 0 ? (
                <p className="home-messages-empty">暂无留言</p>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="message-item">
                    <h4>{message.name}</h4>
                    <p>{message.content}</p>
                    <div className="message-time">{message.time}</div>
                  </div>
                ))
              )}
            </div>
            <a href="#" className="review-link home-bottom-link" onClick={(e) => { e.preventDefault(); onViewMessagesClick?.(); }}>查看全部留言</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;