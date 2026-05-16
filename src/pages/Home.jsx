import React from 'react'
import TipsSlider from '../Componentes/HOmeAllpage/TipeSlider'
import HeroBanner from '../Componentes/HOmeAllpage/HeroBanner'
import DalySixDataDB from '../Componentes/HOmeAllpage/DalySixDataDB'
import CustomerReviews from '../Componentes/HOmeAllpage/CustomerReviews'
import FeaturesSection from '../Componentes/HOmeAllpage/FeaturesSection'
import ServicesSection from '../Componentes/HOmeAllpage/ServicesSection'
import CategoriesSection from '../Componentes/HOmeAllpage/CategoriesSection'
import ChefSpotlight from '../Componentes/HOmeAllpage/ChefSpotlight'
import BlogSection from '../Componentes/HOmeAllpage/BlogSection'
import NewsletterSection from '../Componentes/HOmeAllpage/NewsletterSection'
import FAQSection from '../Componentes/HOmeAllpage/FAQSection'
import CTASection from '../Componentes/HOmeAllpage/CTASection'
import StatsCounter from '../Componentes/HOmeAllpage/StatsCounter'

const Home = () => {
  return (
    <div>
      <title>LocalChefBazaar — Marketplace for Local Home-Cooked Meals</title>

      {/* Hero Section - 60-70% height with interactive elements */}
      <HeroBanner />

      {/* Features Section - Why choose us */}
      <FeaturesSection />

      {/* Platform Statistics - Social Proof */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-[#0f0f0f] transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <StatsCounter />
        </div>
      </section>

      {/* Daily Meals Section - Featured meals */}
      <DalySixDataDB />
      
        {/* The review MAIN BOSS  */}
      {/* Customer Reviews - Social proof */}
      <CustomerReviews />
     
      {/* Categories Section - Cuisine types */}
      <CategoriesSection />
      

    {/*  */}

  {/* Chef Spotlight - Featured chefs */}
      <ChefSpotlight />

      
      {/* Services Section - What we offer */}
      <ServicesSection />
      
    
    
      
     
    
      
      {/* Blog Section - Latest articles */}
      <BlogSection />

      {/* Featured Dishes Slider */}
      <TipsSlider />
      
      {/* Newsletter Section - Stay updated */}
      <NewsletterSection />

      {/* FAQ Section - Common questions */}
      <FAQSection />
      
      {/* Call to Action Section - Final push */}
      <CTASection />
    </div>
  );
}

export default Home
