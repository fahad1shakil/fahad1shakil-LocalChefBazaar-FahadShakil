import React from 'react'
import TipsSlider from '../Componentes/HOmeAllpage/TipeSlider'
import HeroBanner from '../Componentes/HOmeAllpage/HeroBanner'
import DalySixDataDB from '../Componentes/HOmeAllpage/DalySixDataDB'
import CustomerReviews from '../Componentes/HOmeAllpage/CustomerReviews'
import HomeStats from '../Componentes/HOmeAllpage/HomeStats'
import FeaturesSection from '../Componentes/HOmeAllpage/FeaturesSection'
import ServicesSection from '../Componentes/HOmeAllpage/ServicesSection'
import CategoriesSection from '../Componentes/HOmeAllpage/CategoriesSection'
import ChefSpotlight from '../Componentes/HOmeAllpage/ChefSpotlight'
import BlogSection from '../Componentes/HOmeAllpage/BlogSection'
import NewsletterSection from '../Componentes/HOmeAllpage/NewsletterSection'
import FAQSection from '../Componentes/HOmeAllpage/FAQSection'
import CTASection from '../Componentes/HOmeAllpage/CTASection'

const Home = () => {
  return (
    <div>
      <title>LocalChefBazaar — Marketplace for Local Home-Cooked Meals</title>
      
      {/* Hero Section - 60-70% height with interactive elements */}
      <HeroBanner />
      
      {/* Features Section - Why choose us */}
      <FeaturesSection />
      
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
      
      {/* Newsletter Section - Stay updated */}
      <NewsletterSection />
      
      {/* FAQ Section - Common questions */}
      <FAQSection />
      
      {/* Call to Action Section - Final push */}
      <CTASection />
      
      {/* Tips Slider - Optional additional content */}
      {/* <TipsSlider /> */}
    </div>
  );
}

export default Home
