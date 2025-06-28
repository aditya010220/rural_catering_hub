import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import FeaturedCaterersGrid from './components/FeaturedCaterersGrid';
import CategorySection from './components/CategorySection';
import PopularDishesSection from './components/PopularDishesSection';
import StoriesSection from './components/StoriesSection';
import Footer from './components/Footer';

const HomeLandingPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Rural Catering Hub - Authentic Flavors, Delivered';
    
    // Add scroll reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with cultural-slide-up class
    const slideUpElements = document.querySelectorAll('.cultural-slide-up');
    slideUpElements.forEach(el => observer.observe(el));

    // Cleanup observer on unmount
    return () => {
      slideUpElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="navigation-offset">
        <HeroSection />
        <VideoSection />
        <FeaturedCaterersGrid />
        <CategorySection />
        <PopularDishesSection />
        <StoriesSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomeLandingPage;