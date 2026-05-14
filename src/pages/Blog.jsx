import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight, FiClock, FiTag, FiMail, FiCheck } from 'react-icons/fi';
import { scrollToTop } from '../utils/smoothScroll';

// Import newly generated premium assets
import bengaliSpices from '../assets/blog/bengali_spices.png';
import organicFarm from '../assets/blog/organic_farm.png';
import saffronBiryani from '../assets/blog/saffron_biryani.png';
import chefSultana from '../assets/blog/chef_sultana.png';
import chefToufiqur from '../assets/blog/chef_toufiqur.png';
import editorialLogo from '../assets/blog/editorial_logo.png';

const Blog = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };
  
  const blogPosts = [
    {
      id: 1,
      title: "Mastering the Art of Traditional Bengali Spices",
      excerpt: "Take a deep dive into the aromatic world of Bengali cuisine and learn how to balance the five essential spices for the perfect flavor profile.",
      image: bengaliSpices,
      author: "Chef Sultana Parvin",
      authorImage: chefSultana,
      date: "May 12, 2026",
      readTime: "8 min read",
      category: "Spice Secrets",
      featured: true
    },
    {
      id: 2,
      title: "Farm-to-Table: Meet Our Local Organic Growers",
      excerpt: "Go behind the scenes and discover the dedicated local farmers who provide the fresh ingredients for your favorite meals.",
      image: organicFarm,
      author: "Bazaar Editorial",
      authorImage: editorialLogo,
      date: "May 10, 2026",
      readTime: "5 min read",
      category: "Community",
      featured: true
    },
    {
      id: 3,
      title: "The Secret to the Perfect Saffron Infused Biryani",
      excerpt: "Expert tips from a master chef on how to achieve that perfect fluffy texture and royal aroma in every single grain of rice.",
      image: saffronBiryani,
      author: "Chef Toufiqur Rahman",
      authorImage: chefToufiqur,
      date: "May 08, 2026",
      readTime: "12 min read",
      category: "Chef Secrets",
      featured: false
    },
    {
      id: 4,
      title: "Sustainable Cooking: Local Ingredients, Global Impact",
      excerpt: "How choosing local ingredients can make a difference for both your health and the environment. Explore the benefits of farm-to-table.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=500&fit=crop",
      author: "Chef Sultana Parvin",
      authorImage: chefSultana,
      date: "May 05, 2026",
      readTime: "6 min read",
      category: "Sustainability",
      featured: false
    },
    {
      id: 5,
      title: "The Science of Baking: Mastering Sourdough",
      excerpt: "Understanding the chemistry behind bread making will help you achieve consistent, delicious results every time you bake at home.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=500&fit=crop",
      author: "Chef Toufiqur Rahman",
      authorImage: chefToufiqur,
      date: "May 03, 2026",
      readTime: "10 min read",
      category: "Chef Secrets",
      featured: false
    },
    {
      id: 6,
      title: "A Guide to Authentic Street Food of Old Dhaka",
      excerpt: "Join us on a journey through the narrow alleys of Old Dhaka to find the most iconic and delicious street food gems.",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=800&h=500&fit=crop",
      author: "Bazaar Editorial",
      authorImage: editorialLogo,
      date: "May 01, 2026",
      readTime: "15 min read",
      category: "Community",
      featured: false
    },
    {
      id: 7,
      title: "Healthy Breakfast Bowls: Start Your Day Right",
      excerpt: "Nutritious and vibrant breakfast bowl ideas that are quick to prepare and packed with energy for your busy morning.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop",
      author: "Chef Sultana Parvin",
      authorImage: chefSultana,
      date: "April 28, 2026",
      readTime: "5 min read",
      category: "Spice Secrets",
      featured: false
    },
    {
      id: 8,
      title: "The Art of Slow Cooking: Tender Meats Every Time",
      excerpt: "Discover why slow cooking is the secret to the most flavorful and tender meat dishes in world cuisine.",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=500&fit=crop",
      author: "Chef Toufiqur Rahman",
      authorImage: chefToufiqur,
      date: "April 25, 2026",
      readTime: "9 min read",
      category: "Chef Secrets",
      featured: false
    }
  ];

  const categories = ["All", "Spice Secrets", "Community", "Chef Secrets", "Sustainability"];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Matching Banner Look */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden bg-white">
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-[#6db70e]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center">
            <h3 className="text-[#6db70e] text-4xl md:text-5xl font-bold mb-4 font-serif italic">
              Insightful
            </h3>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-6">
              Our Kitchen <span className="text-[#6db70e]">Blog</span>
            </h1>
            <span className="text-[10px] font-black tracking-[0.8em] text-[#6db70e] uppercase mt-4 block">
              Bazaar Community Stories
            </span>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mt-10">
              Discover cooking tips, recipes, and stories from our talented chef community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter - Premium Tabs */}
      <section className="py-12 border-y border-slate-50 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#6db70e] text-white shadow-xl shadow-[#6db70e]/30 scale-105'
                    : 'bg-white text-slate-400 hover:text-[#6db70e] hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Featured Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group relative h-[550px] rounded-[3rem] overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-12 w-full">
                  <span className="px-4 py-1.5 bg-[#6db70e] text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6 inline-block">
                    Featured Story
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight leading-tight group-hover:text-[#6db70e] transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <img src={post.authorImage} alt={post.author} className="w-10 h-10 rounded-full border-2 border-white/20" />
                      <span className="text-white text-[10px] font-black uppercase tracking-widest">{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} onClick={scrollToTop} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-900 group-hover:bg-[#6db70e] group-hover:text-white transition-all">
                      <FiArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Regular Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(109,183,14,0.1)] border border-slate-50 transition-all duration-500 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-[#6db70e] text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-1.5"><FiCalendar className="text-[#6db70e]" /><span>{post.date}</span></div>
                    <div className="flex items-center gap-1.5"><FiClock className="text-[#6db70e]" /><span>{post.readTime}</span></div>
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-[#6db70e] transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-8 line-clamp-2 font-medium opacity-80">{post.excerpt}</p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.authorImage} alt={post.author} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md" />
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} onClick={scrollToTop} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#6db70e] hover:bg-[#6db70e] hover:text-white transition-all shadow-sm">
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Matching Hero/Banner Footer Style */}
      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6db70e]/20 rounded-full blur-[120px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Never Miss a <span className="text-[#6db70e]">Recipe</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
            Join our elite community of food lovers and get master chef secrets delivered to your inbox.
          </p>
          
          {isSubscribed ? (
            <motion.div className="flex items-center justify-center gap-3 text-2xl font-black text-[#6db70e]" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <FiCheck size={32} /> <span>Welcome to the Family!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Your email address" 
                className="flex-1 px-8 py-5 rounded-full bg-white/10 border border-white/10 text-white focus:outline-none focus:border-[#6db70e] transition-all"
                required 
              />
              <button type="submit" disabled={isLoading} className="px-10 py-5 bg-[#6db70e] text-white font-black rounded-full uppercase text-xs tracking-widest hover:bg-[#7cd112] transition-all shadow-xl cursor-pointer">
                {isLoading ? 'Subscribing...' : 'Join Now'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;