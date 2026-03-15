import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import AnnualReview from './components/AnnualReview';
import BookReviews from './components/BookReviews';
import MessageBoard from './components/MessageBoard';
import AnnualReviewFull from './components/AnnualReviewFull';
import BookReviewsFull from './components/BookReviewsFull';
import AnnualReviewDetail from './components/AnnualReviewDetail';
import EssayHome from './components/EssayHome';
import EssayCategoryList from './components/EssayCategoryList';
import EssayArticleDetail from './components/EssayArticleDetail';
import { reviews } from './data/annualReviewsData';

function App() {
  const location = useLocation();
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 根据 URL 同步导航高亮：/essays 及子路径高亮「单篇札记」
  useEffect(() => {
    if (location.pathname.startsWith('/essays')) {
      setActivePage('reviews');
    }
  }, [location.pathname]);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleReviewClick = (reviewId) => {
    navigate(`/annual/${reviewId}`);
  };

  return (
    <div className="App">
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="container navbar-container">
          <a href="#" className="navbar-logo" onClick={() => handleNavClick('home')}>
            Echo Fu · 回声
          </a>
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
          <ul className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li>
              <a 
                href="#" 
                onClick={() => handleNavClick('home')}
                className={activePage === 'home' ? 'active' : ''}
              >
                首页
              </a>
            </li>
            <li>
              <a 
                href="#" 
                onClick={() => handleNavClick('annual')}
                className={activePage === 'annual' ? 'active' : ''}
              >
                年度盘点
              </a>
            </li>
            <li>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('reviews'); navigate('/essays'); }}
                className={activePage === 'reviews' ? 'active' : ''}
              >
                单篇札记（2020年及以前）
              </a>
            </li>
            <li>
              <a 
                href="#" 
                onClick={() => handleNavClick('messages')}
                className={activePage === 'messages' ? 'active' : ''}
              >
                留言板
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* 主要内容 */}
      <main>
        <Routes>
          <Route path="/annual/:year" element={<AnnualReviewDetail />} />
          <Route path="/essays" element={<EssayHome />} />
          <Route path="/essays/:categorySlug" element={<EssayCategoryList />} />
          <Route path="/essays/:categorySlug/:articleId" element={<EssayArticleDetail />} />
          <Route path="*" element={
            <>
              {activePage === 'home' && <Home reviews={reviews} onReviewClick={handleReviewClick} onViewAllClick={() => handleNavClick('annual')} onViewMessagesClick={() => handleNavClick('messages')} />}
              {activePage === 'annual' && <AnnualReviewFull onReviewClick={handleReviewClick} reviews={reviews} />}
              {activePage === 'reviews' && <BookReviewsFull />}
              {activePage === 'messages' && <MessageBoard />}
            </>
          } />
        </Routes>
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Echo的回音壁. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;