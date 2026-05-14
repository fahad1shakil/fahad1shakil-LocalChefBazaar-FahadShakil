import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight, FiClock } from 'react-icons/fi';
import { scrollToTop } from '../../utils/smoothScroll';

// Import newly generated premium assets
import bengaliSpices from '../../assets/blog/bengali_spices.png';
import organicFarm from '../../assets/blog/organic_farm.png';
import saffronBiryani from '../../assets/blog/saffron_biryani.png';
import chefSultana from '../../assets/blog/chef_sultana.png';
import chefToufiqur from '../../assets/blog/chef_toufiqur.png';
import editorialLogo from '../../assets/blog/editorial_logo.png';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Mastering the Art of Traditional Bengali Spices",
      excerpt: "Take a deep dive into the aromatic world of Bengali cuisine and learn how to balance the five essential spices.",
      image: bengaliSpices,
      author: "Chef Sultana Parvin",
      authorImage: chefSultana,
      date: "May 12, 2026",
      readTime: "8 min read",
      category: "Spice Secrets"
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
      category: "Community"
    },
    {
      id: 3,
      title: "The Secret to the Perfect Saffron Infused Biryani",
      excerpt: "Expert tips from a master chef on how to achieve that perfect fluffy texture and royal aroma in every grain.",
      image: saffronBiryani,
      author: "Chef Toufiqur Rahman",
      authorImage: chefToufiqur,
      date: "May 08, 2026",
      readTime: "12 min read",
      category: "Chef Secrets"
    }
  ];

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6db70e]/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center">
            <h3 className="text-[#6db70e] text-4xl md:text-5xl font-bold mb-2 font-serif italic">
              Insightful
            </h3>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
              From Our <span className="text-[#6db70e]">Kitchen Blog</span>
            </h2>
            <span className="text-[10px] font-black tracking-[0.6em] text-[#6db70e] uppercase mt-4 block">
              Bazaar Community
            </span>
            <div className="h-1.5 w-24 bg-[#6db70e] rounded-full shadow-[0_0_15px_rgba(109,183,14,0.3)] mt-8" />
          </div>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mt-10">
            Discover cooking tips, recipes, and stories from our talented chef community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(109,183,14,0.1)] border border-slate-50 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden h-72">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-[#6db70e] text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <FiCalendar className="text-[#6db70e]" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiClock className="text-[#6db70e]" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-[#6db70e] transition-colors duration-300 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed mb-8 line-clamp-2 font-medium opacity-80">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">{post.author}</span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Featured Chef</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    onClick={scrollToTop}
                    className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-[#6db70e] hover:bg-[#6db70e] hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <FiArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link to="/blog" onClick={scrollToTop}>
            <button className="px-12 py-4 border-2 border-slate-900/10 rounded-full text-slate-900 font-black text-xs uppercase tracking-[0.4em] hover:border-[#6db70e] hover:text-[#6db70e] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl bg-white cursor-pointer group">
              <span className="relative z-10">Explore All Stories</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;