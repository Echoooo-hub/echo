import React from 'react';

const AnnualReviewFull = ({ onReviewClick, reviews }) => {
  return (
    <section className="annual-review">
      <div className="container">
        <h2 className="section-title">年度盘点</h2>
        <div className="review-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <h2>{review.id === '2025' ? '2025年读书盘点' : review.title}</h2>
              <p>{review.excerpt}</p>
              <a href="#" className="review-link" onClick={() => onReviewClick(review.id)}>阅读全文</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnualReviewFull;