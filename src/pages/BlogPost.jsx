import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowLeft, FiTag, FiShare2, FiArrowRight } from 'react-icons/fi';
import { scrollToTop } from '../utils/smoothScroll';

// Import newly generated premium assets
import bengaliSpices from '../assets/blog/bengali_spices.png';
import organicFarm from '../assets/blog/organic_farm.png';
import saffronBiryani from '../assets/blog/saffron_biryani.png';
import chefSultana from '../assets/blog/chef_sultana.png';
import chefToufiqur from '../assets/blog/chef_toufiqur.png';
import editorialLogo from '../assets/blog/editorial_logo.png';

const BlogPost = () => {
  const { id } = useParams();

  const blogPosts = [
    {
      id: 1,
      title: "Mastering the Art of Traditional Bengali Spices",
      excerpt: "Take a deep dive into the aromatic world of Bengali cuisine and learn how to balance the five essential spices.",
      content: `
        <p>In the heart of every Bengali kitchen lies a small spice box, or 'moshla-dani', that holds the secrets to centuries of culinary tradition. Mastering these spices isn't just about measurement; it's about understanding the soul of the dish. Bengali cuisine is unique in its use of whole spices, particularly in the tempering process known as 'phoron'.</p>
        <h2 style="font-weight: 900; font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; color: #7ecf55;">The Panch Phoron Magic</h2>
        <p>The foundation of many Bengali dishes is the legendary 'Panch Phoron' – a blend of five whole spices: cumin, nigella, fenugreek, aniseed, and mustard seeds. Each spice in this mix has a specific purpose:</p>
        <ul style="margin-bottom: 1.5rem; list-style-type: disc; padding-left: 1.5rem;">
          <li><strong>Cumin (Jeera):</strong> Adds a warm, earthy base.</li>
          <li><strong>Nigella (Kalo Jeera):</strong> Provides a subtle peppery bite.</li>
          <li><strong>Fenugreek (Methi):</strong> Offers a hint of bitterness that balances sweetness.</li>
          <li><strong>Aniseed (Mouri):</strong> Brings a sweet, refreshing aftertaste.</li>
          <li><strong>Mustard Seeds (Shorse):</strong> Gives a sharp, nutty pop.</li>
        </ul>
        <h3 style="font-weight: 800; font-size: 1.5rem; margin-top: 1.5rem; color: #7ecf55;">The Art of Tempering</h3>
        <p>Tempering is the most critical step. You must heat the oil until it reaches its smoking point, then drop the whole spices in. They should sizzle and pop immediately, releasing their essential oils into the fat. If the oil is too cold, the spices won't bloom; if too hot, they will burn and turn bitter.</p>
        <blockquote style="border-left: 4px solid #7ecf55; padding-left: 20px; font-style: italic; font-family: serif; font-size: 1.5rem; margin: 2rem 0; color: #e0e0e0;">
          "Spices in a Bengali kitchen are not just ingredients; they are the storyteller of our ancestors' journeys."
        </blockquote>
        <h2 style="font-weight: 900; font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; color: #7ecf55;">Layering Powdered Spices</h2>
        <p>Once the whole spices have bloomed, we introduce the 'trio' of powdered spices: Turmeric, Cumin, and Coriander. The key is to make a paste with a little water before adding them. This prevents the delicate powders from burning and allows them to cook evenly, creating a rich 'bhuna' base.</p>
      `,
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
      excerpt: "Go behind the scenes and discover the dedicated local farmers who provide the fresh ingredients.",
      content: `
        <p>At LocalChef Bazaar, our philosophy is simple: Great food starts with great soil. We've spent months traveling to small, independent farms across the region to find the growers who share our passion for quality and sustainability.</p>
        <h2 style="font-weight: 900; font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; color: #7ecf55;">The Morning Harvest Cycle</h2>
        <p>Our logistics are designed to be as fast as nature allows. Most of our vegetables are harvested at 4:00 AM and arrive at our chefs' kitchens by 8:00 AM. This rapid turnaround is essential because once a plant is cut, its sugars begin to turn into starches. By eating farm-to-table, you aren't just getting better flavor; you're getting maximum nutrition.</p>
        <h3 style="font-weight: 800; font-size: 1.5rem; margin-top: 1.5rem; color: #7ecf55;">The Sustainable Difference</h3>
        <p>Our partner farmers use regenerative practices, including crop rotation, composting, and natural pest control. When you choose a meal from LocalChef Bazaar, you are directly supporting these small-scale heroes and helping to keep local agriculture alive.</p>
      `,
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
      excerpt: "Expert tips from a master chef on how to achieve that perfect fluffy texture and royal aroma.",
      content: `
        <p>Biryani is more than just a meal; it's a royal celebration in a pot. Originating from the grand kitchens of the Mughals, this dish requires a level of patience and precision that few other recipes demand. The secret lies in the 'Dum' – the art of slow-cooking in a sealed pot.</p>
        <h2 style="font-weight: 900; font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; color: #7ecf55;">The Rice: The Long and Short of It</h2>
        <p>For a Bazaar-standard biryani, we exclusively use aged, long-grain Basmati rice. The aging process is crucial as it dries out the moisture in the grain, ensuring each grain remains separate and fluffy. Over-washing is a mistake; wash gently until clear, then soak for exactly 30 minutes.</p>
        <h3 style="font-weight: 800; font-size: 1.5rem; margin-top: 1.5rem; color: #7ecf55;">The Saffron Alchemy</h3>
        <p>Saffron is the world's most expensive spice. Never drop dry strands directly into the pot. Instead, toast them lightly, crush into a powder, and infuse in warm milk. This creates a vibrant liquid that provides the iconic marbling and intoxicating aroma.</p>
      `,
      image: saffronBiryani,
      author: "Chef Toufiqur Rahman",
      authorImage: chefToufiqur,
      date: "May 08, 2026",
      readTime: "12 min read",
      category: "Chef Secrets"
    },
    {
      id: 4,
      title: "Sustainable Cooking: Local Ingredients, Global Impact",
      excerpt: "How choosing local ingredients can make a difference for both your health and the environment.",
      content: `
        <p>Sustainability in the kitchen is about minimizing resources while maximizing the benefit to the local ecosystem. Every time you choose a local ingredient over an imported one, you are making a global impact.</p>
        <h2 style="font-weight: 900; font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; color: #7ecf55;">Reducing Culinary Carbon</h2>
        <p>The average meal travels over 1,500 miles. By sourcing from farmers within a 50-mile radius, we effectively eliminate 95% of the transportation emissions associated with your dinner. It's cleaner for the planet and fresher for you.</p>
        <h3 style="font-weight: 800; font-size: 1.5rem; margin-top: 1.5rem; color: #7ecf55;">Zero-Waste Techniques</h3>
        <p>Our chefs are trained in 'root-to-stem' cooking. Vegetable peels are simmered for rich stocks, excess herbs are dried into custom blends, and over-ripe fruits are fermented into artisanal vinegars. Nothing goes to waste in a Bazaar kitchen.</p>
      `,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=500&fit=crop",
      author: "Chef Sultana Parvin",
      authorImage: chefSultana,
      date: "May 05, 2026",
      readTime: "6 min read",
      category: "Sustainability"
    },
    {
      id: 5,
      title: "The Science of Baking: Mastering Sourdough",
      excerpt: "Understanding the chemistry behind bread making will help you achieve consistent, delicious results.",
      content: `
        <p>Sourdough is the ultimate expression of slow food. Unlike commercial bread, it relies on a wild culture of yeast and bacteria that can take 48 hours to work. This process is as much chemistry as it is cooking.</p>
        <h2 style="font-weight: 900; font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; color: #7ecf55;">The Microbiome of Your Starter</h2>
        <p>A sourdough starter is a living ecosystem. Lactic acid bacteria provide the 'sour' tang and break down phytic acid, making the minerals easier to absorb. This is why many people find sourdough much easier to digest than industrial bread.</p>
        <h3 style="font-weight: 800; font-size: 1.5rem; margin-top: 1.5rem; color: #7ecf55;">The Magic of Oven Spring</h3>
        <p>To achieve the perfect oven spring, you need strong gluten and steam. The steam keeps the crust soft, allowing the gases to expand the loaf before the crust sets. This creates the beautiful 'open crumb' that artisan bakers strive for.</p>
      `,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=500&fit=crop",
      author: "Chef Toufiqur Rahman",
      authorImage: chefToufiqur,
      date: "May 03, 2026",
      readTime: "10 min read",
      category: "Chef Secrets"
    },
    {
      id: 6,
      title: "A Guide to Authentic Street Food of Old Dhaka",
      excerpt: "Join us on a journey through the narrow alleys of Old Dhaka to find the most iconic gems.",
      content: `
        <p>Old Dhaka is a sensory explosion where history is measured in the layers of spice on a well-used griddle. The street food here is a refined legacy of the Mughal era.</p>
        <h2 style="font-weight: 900; font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; color: #7ecf55;">The Kacchi King of Nazira Bazar</h2>
        <p>Kacchi Biryani involves marinating raw mutton in spices and yogurt, layering it with raw rice, and cooking them together. The meat becomes so tender it falls apart at the touch of a spoon, and the rice absorbs every drop of the flavorful juices.</p>
        <h3 style="font-weight: 800; font-size: 1.5rem; margin-top: 1.5rem; color: #7ecf55;">Iconic Bites</h3>
        <p>From the crunchy 200-year-old Bakorkhani to the refreshing Beauty Lassi served since 1922, Old Dhaka's food is a true piece of soul that our chefs bring to your doorstep.</p>
      `,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=800&h=500&fit=crop",
      author: "Bazaar Editorial",
      authorImage: editorialLogo,
      date: "May 01, 2026",
      readTime: "15 min read",
      category: "Community"
    },
    {
      id: 7,
      title: "Healthy Breakfast Bowls: Start Your Day Right",
      excerpt: "Nutritious and vibrant breakfast bowl ideas that are quick to prepare and packed with energy.",
      content: `
        <p>The science of a perfect breakfast bowl lies in the balance of macronutrients. By combining complex carbs, healthy fats, and lean proteins, you can eliminate the dreaded 10:00 AM slump.</p>
        <h2 style="font-weight: 900; font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; color: #7ecf55;">The Anatomy of a High-Energy Bowl</h2>
        <p>Every bowl should have a base of amaranth or quinoa, a protein like Greek yogurt or hemp seeds, and a healthy fat like avocado or almond butter. Add seasonal berries for a burst of antioxidants.</p>
        <h3 style="font-weight: 800; font-size: 1.5rem; margin-top: 1.5rem; color: #7ecf55;">Busy Morning Prep</h3>
        <p>Cook a large batch of grains on Sunday. Pre-chopping fruits and toasting nuts allows you to assemble a gourmet-level bowl in under 3 minutes on a busy weekday morning.</p>
      `,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop",
      author: "Chef Sultana Parvin",
      authorImage: chefSultana,
      date: "April 28, 2026",
      readTime: "5 min read",
      category: "Spice Secrets"
    },
    {
      id: 8,
      title: "The Art of Slow Cooking: Tender Meats Every Time",
      excerpt: "Discover why slow cooking is the secret to the most flavorful and tender meat dishes.",
      content: `
        <p>Slow cooking is the ultimate act of patience. It transforms tough, flavorful cuts into melt-in-your-mouth perfection by letting heat work its magic gently over hours.</p>
        <h2 style="font-weight: 900; font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; color: #7ecf55;">The Science of Braising</h2>
        <p>Tough cuts like shank or brisket contain high collagen. When cooked slowly at low heat, this collagen melts into rich gelatin. This is what gives slow-cooked dishes their incredible mouthfeel and glossy, deep sauces.</p>
        <h3 style="font-weight: 800; font-size: 1.5rem; margin-top: 1.5rem; color: #7ecf55;">Essential Rules</h3>
        <p>Always sear your meat first to create the Maillard reaction foundation. Never peek – lifting the lid loses heat and moisture. At Bazaar, our signature curries are slow-cooked for up to 12 hours for perfection.</p>
      `,
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=500&fit=crop",
      author: "Chef Toufiqur Rahman",
      authorImage: chefToufiqur,
      date: "April 25, 2026",
      readTime: "9 min read",
      category: "Chef Secrets"
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f0f0f]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 dark:text-[#e0e0e0] mb-4">Post Not Found</h1>
          <p className="text-slate-500 dark:text-[#888888] mb-8 font-medium">The culinary story you're looking for has moved to a new season.</p>
          <Link to="/blog">
            <button className="px-10 py-4 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] font-black rounded-full uppercase text-xs tracking-widest shadow-xl">
              Back to Journal
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
      {/* Premium Post Hero - Enhanced Responsiveness */}
      <section className="relative min-h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-end pb-12 md:pb-0 bg-[#0f0f0f]">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={post.image} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
        
        <div className="relative w-full px-6 md:p-10 lg:p-24 z-10 pt-32">
          <div className="max-w-5xl">
            <Link to="/blog">
              <motion.button 
                whileHover={{ x: -5 }}
                className="flex items-center gap-2 text-[#6db70e] dark:text-[#7ecf55] font-black text-[10px] uppercase tracking-[0.4em] mb-6 md:mb-8"
              >
                <FiArrowLeft /> Back to Journal
              </motion.button>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <span className="px-4 py-1.5 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] text-[10px] font-black uppercase tracking-widest rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-3 md:gap-4 text-slate-900 dark:text-[#e0e0e0] font-black text-[9px] md:text-[10px] uppercase tracking-widest opacity-60">
                  <div className="flex items-center gap-1.5"><FiCalendar /> <span>{post.date}</span></div>
                  <div className="flex items-center gap-1.5"><FiClock /> <span>{post.readTime}</span></div>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-[#e0e0e0] tracking-tighter leading-[1.1] mb-6 md:mb-8">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-24 px-6 md:px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          
          {/* Main Body */}
          <div className="lg:col-span-8">
            <article className="prose prose-lg md:prose-2xl max-w-none prose-slate dark:prose-invert">
              <div 
                className="font-medium text-slate-600 dark:text-[#888888] leading-relaxed text-lg md:text-xl"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </article>

            {/* Premium Author Card */}
            <div className="mt-16 md:mt-24 p-8 md:p-12 bg-slate-50 dark:bg-[#111111] rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
              <img src={post.authorImage} alt={post.author} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-[#242424] shadow-xl" />
              <div className="text-center md:text-left flex-1">
                <span className="text-[#6db70e] dark:text-[#7ecf55] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">Featured Expert</span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-[#e0e0e0] mb-4">{post.author}</h3>
                <p className="text-slate-500 dark:text-[#888888] font-medium leading-relaxed text-sm md:text-base">
                  A master of culinary traditions dedicated to bringing authentic, local flavors to your table with every story and recipe.
                </p>
                <div className="flex gap-4 mt-6 justify-center md:justify-start">
                  <button className="p-3 bg-white dark:bg-[#111111] rounded-full text-slate-400 dark:text-[#888888] hover:text-[#6db70e] dark:hover:text-[#7ecf55] transition-all shadow-sm border dark:border-[#242424] dark:border-[0.5px]"><FiShare2 /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-10">
            <div className="bg-slate-900 dark:bg-[#111111] p-10 rounded-[3rem] text-white dark:text-[#e0e0e0] overflow-hidden relative border dark:border-[#242424] dark:border-[0.5px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6db70e]/20 dark:bg-[#7ecf55]/20 rounded-full blur-3xl" />
              <h4 className="text-2xl font-black mb-6 tracking-tight relative z-10">Stay Inspired</h4>
              <p className="text-slate-400 dark:text-[#888888] mb-8 font-medium text-sm leading-relaxed relative z-10">
                Join our private community and receive master-chef secrets and early access to our seasonal specials.
              </p>
              <div className="relative z-10">
                <input type="email" placeholder="Email address" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full mb-4 text-white focus:outline-none focus:border-[#6db70e] dark:focus:border-[#7ecf55]" />
                <button className="w-full py-4 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] font-black rounded-full uppercase text-[10px] tracking-widest hover:bg-[#7cd112] transition-all cursor-pointer">Subscribe Now</button>
              </div>
            </div>

            <div className="p-10 bg-white dark:bg-[#111111] rounded-[3rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-sm">
              <h4 className="text-xl font-black text-slate-900 dark:text-[#e0e0e0] mb-8 tracking-tight">Recent Stories</h4>
              <div className="space-y-8">
                {blogPosts.slice(0, 4).map((p) => (
                  <Link key={p.id} to={`/blog/${p.id}`} onClick={scrollToTop} className="group flex gap-4 items-center">
                    <img src={p.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                    <div>
                      <h5 className="font-black text-slate-900 dark:text-[#e0e0e0] text-sm leading-tight group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] transition-all line-clamp-2">{p.title}</h5>
                      <span className="text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest mt-2 block">{p.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-white dark:bg-[#0f0f0f] border-t border-slate-50 dark:border-[#242424] dark:border-[0.5px]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link to="/blog" onClick={scrollToTop}>
            <button className="group flex items-center gap-4 mx-auto text-slate-400 dark:text-[#888888] hover:text-slate-900 dark:hover:text-[#e0e0e0] transition-all cursor-pointer">
              <span className="font-black text-xs uppercase tracking-[0.5em]">Explore Full Journal</span>
              <div className="w-10 h-10 rounded-full border border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex items-center justify-center group-hover:border-[#6db70e] dark:group-hover:border-[#7ecf55] group-hover:bg-[#6db70e] dark:group-hover:bg-[#7ecf55] group-hover:text-white dark:group-hover:text-[#0f0f0f] transition-all">
                <FiArrowRight />
              </div>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;