import React from 'react';
import { useParams } from 'react-router-dom';
import { annualReviews } from '../data/annualReviewsData';

const AnnualReviewDetail = () => {
  const { year } = useParams();
  const review = year
    ? annualReviews.find(
        (r) => r.id === String(year) || r.year === Number(year)
      )
    : null;

  if (!review) {
    return (
      <section className="annual-review">
        <div className="container">
          <h2 className="section-title">文章不存在</h2>
          <p>抱歉，您访问的文章不存在。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="annual-review">
      <div className="container">
        <h1 className="main-title">{review.title}</h1>
        <div className="review-detail">
          <div
            className="review-content annual-review-content"
            style={{ whiteSpace: 'pre-line' }}
          >
            {review.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnualReviewDetail;