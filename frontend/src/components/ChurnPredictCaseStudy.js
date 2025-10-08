import React, { useEffect } from 'react';
import '../styles/ChurnPredictCaseStudy.css'; // We'll create this CSS file

const ChurnPredictCaseStudy = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = '0.2s';
          entry.target.style.animationFillMode = 'both';
        }
      });
    }, observerOptions);

    const mainContent = document.querySelector('.churnpredict-case-study__main-content');
    const bottomSection = document.querySelector('.churnpredict-case-study__bottom-section');
    
    if (mainContent) observer.observe(mainContent);
    if (bottomSection) observer.observe(bottomSection);

    // Scroll parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.churnpredict-case-study__main-headline');
      const speed = scrolled * 0.1;

      if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      if (mainContent) observer.unobserve(mainContent);
      if (bottomSection) observer.unobserve(bottomSection);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="churnpredict-case-study">
      <div className="churnpredict-case-study__container">
        {/* Header */}
        <header className="churnpredict-case-study__header">
          <div className="churnpredict-case-study__header-left">
            <span>ChurnPredict Analytics</span>
          </div>
          <div className="churnpredict-case-study__header-right">
            <span>Machine Learning & Data Science</span>
            <span>Powered by Advanced Algorithms</span>
            <span>www.churnpredict.com</span>
          </div>
        </header>

        

        {/* Bottom Section */}
        <div className="churnpredict-case-study__bottom-section">
          <div className="churnpredict-case-study__sidebar churnpredict-case-study__bottom-sidebar">
            <div className="churnpredict-case-study__section-number">*</div>
            <div className="churnpredict-case-study__section-label">/Overview</div>
          </div>
          <div className="churnpredict-case-study__bottom-content">
            <h2 className="churnpredict-case-study__section-title">Our Approach</h2>
            <p className="churnpredict-case-study__section-text">
              We combine behavioral analytics, purchase patterns, and engagement metrics with 
              advanced machine learning algorithms to identify at-risk customers before they leave. 
              Our models continuously learn and adapt to your business.
            </p>
          </div>
          <div className="churnpredict-case-study__bottom-content">
            <h2 className="churnpredict-case-study__section-title">Key Benefits</h2>
            <p className="churnpredict-case-study__section-text">
              Reduce customer acquisition costs by up to 45% through proactive retention strategies. 
              Our platform provides actionable insights, automated alerts, and personalized 
              intervention recommendations to maximize customer lifetime value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChurnPredictCaseStudy;