import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiMessageCircle, FiX, FiSend, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text:"Welcome to LocalChefBazaar! I am your AI assistant, developed by — Fahad Shakil. How may I assist you with your culinary needs today? 🍽️",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI responses with meal-specific features
  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to LocalChefBazaar! 🍽️ I'm your AI food assistant. I can help you find amazing meals, connect with local chefs, and guide you through ordering. What delicious adventure can I help you with today?";
    }
    
    if (lowerMessage.includes('meal') || lowerMessage.includes('food') || lowerMessage.includes('dish')) {
      return "Fantastic! Our local chefs prepare fresh, homemade meals daily. 🍕🍜🥗 You can browse our Daily Meals section for today's specials or visit All Meals for our complete menu. Would you like recommendations for breakfast, lunch, dinner, or maybe a specific cuisine?";
    }
    
    if (lowerMessage.includes('italian') || lowerMessage.includes('pasta') || lowerMessage.includes('pizza')) {
      return "Mmm, Italian cuisine! 🍝🍕 Our Italian chefs create authentic pasta dishes, wood-fired pizzas, and classic risottos. Check out our Meals page and filter by 'Italian' to see all available options. Buon appetito!";
    }
    
    if (lowerMessage.includes('indian') || lowerMessage.includes('curry') || lowerMessage.includes('spicy')) {
      return "Excellent choice! 🍛🌶️ Our Indian chefs offer aromatic curries, biryanis, tandoori dishes, and fresh naan. Each dish is prepared with authentic spices. Look for the 'Indian Spices' category in our meals section!";
    }
    
    if (lowerMessage.includes('mexican') || lowerMessage.includes('tacos') || lowerMessage.includes('burrito')) {
      return "¡Delicioso! 🌮🌯 Our Mexican chefs serve authentic tacos, burritos, quesadillas, and traditional salsas. Fresh ingredients and bold flavors guaranteed! Check our 'Mexican Flavors' category for mouth-watering options.";
    }
    
    if (lowerMessage.includes('chef') || lowerMessage.includes('cook')) {
      return "Our platform features amazing local chefs! 👨‍🍳👩‍🍳 Each chef has their own profile showing their specialties, experience, ratings, and signature dishes. Visit our Chefs page to meet them and see their culinary stories. You can even follow your favorites!";
    }
    
    if (lowerMessage.includes('order') || lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
      return "Ordering is super easy! 📦✨ Here's how: 1) Browse meals and click 'View Details' 2) Choose quantity and add to cart 3) Sign in if needed 4) Provide delivery address 5) Complete payment. You can track everything in your dashboard!";
    }
    
    if (lowerMessage.includes('delivery') || lowerMessage.includes('time') || lowerMessage.includes('fast')) {
      return "We pride ourselves on fresh, fast delivery! 🚚⏰ Most meals arrive in 30-45 minutes. Each meal card shows the estimated delivery time. Our chefs prepare your order fresh and deliver it hot to your doorstep!";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive') || lowerMessage.includes('cheap')) {
      return "Great value for homemade quality! 💰 Our meals range from budget-friendly options to premium chef specials. Prices are clearly shown on each meal card. We believe everyone deserves access to delicious, fresh, local food!";
    }
    
    if (lowerMessage.includes('healthy') || lowerMessage.includes('diet') || lowerMessage.includes('nutrition')) {
      return "Health-conscious eating made easy! 🥗💪 Many of our chefs offer healthy options including vegetarian, vegan, gluten-free, and low-carb meals. Look for dietary tags on meal cards or ask chefs about ingredients!";
    }
    
    if (lowerMessage.includes('vegetarian') || lowerMessage.includes('vegan') || lowerMessage.includes('plant')) {
      return "Perfect! 🌱 We have many plant-based options from creative chefs. Look for vegetarian/vegan tags on meals, or browse our chef profiles to find specialists in plant-based cuisine. Delicious and nutritious!";
    }
    
    if (lowerMessage.includes('breakfast') || lowerMessage.includes('morning')) {
      return "Start your day right! 🌅🥞 Our chefs offer fresh breakfast options like pancakes, omelets, smoothie bowls, and traditional breakfast plates. Perfect for busy mornings when you want something special!";
    }
    
    if (lowerMessage.includes('dinner') || lowerMessage.includes('evening')) {
      return "End your day deliciously! 🌙🍽️ Our dinner selection includes hearty mains, comfort foods, and gourmet specialties. Perfect for family dinners or treating yourself after a long day!";
    }
    
    if (lowerMessage.includes('sign up') || lowerMessage.includes('register') || lowerMessage.includes('account')) {
      return "Join our food-loving community! 📝✨ Click 'Sign Up' in the navigation or use Google sign-in for quick registration. Members can order, save favorites, track deliveries, and get personalized recommendations!";
    }
    
    if (lowerMessage.includes('favorite') || lowerMessage.includes('save') || lowerMessage.includes('bookmark')) {
      return "Love a meal? Save it! ❤️ Signed-in users can add meals to favorites by clicking the heart icon. Access your saved meals anytime from your dashboard to reorder your go-to dishes!";
    }
    
    if (lowerMessage.includes('rating') || lowerMessage.includes('review') || lowerMessage.includes('feedback')) {
      return "Reviews help everyone! ⭐ After ordering, you can rate meals and leave reviews. This helps other customers choose and helps chefs improve. Check meal ratings before ordering to see what others loved!";
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('card')) {
      return "Secure and easy payments! 💳 We accept major credit cards and digital payments. All transactions are encrypted and secure. You'll receive confirmation and can track your order status in real-time!";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('problem')) {
      return "I'm here to help! 🤝 For detailed support, visit our Contact page or check our Services page. You can also browse our FAQ section. What specific issue can I assist you with right now?";
    }
    
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('best')) {
      return "I'd love to help you discover something amazing! 🌟 Our Daily Meals section features today's freshest options. For crowd favorites, look for meals with 4+ star ratings. What type of cuisine or meal are you in the mood for?";
    }
    
    if (lowerMessage.includes('today') || lowerMessage.includes('daily') || lowerMessage.includes('fresh')) {
      return "Today's fresh picks! 📅🍽️ Check our Daily Meals section for today's special offerings from local chefs. These are prepared fresh daily and showcase seasonal ingredients. Perfect for trying something new!";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('awesome')) {
      return "You're absolutely welcome! 😊🍴 I'm always here to help make your LocalChefBazaar experience amazing. Enjoy exploring our delicious world of local flavors!";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      return "Need direct contact? 📞📧 Visit our Contact page for phone numbers, email addresses, and a contact form. Our support team is ready to help with any questions or special requests!";
    }
    
    // Default response with helpful suggestions
    return "That's an interesting question! 🤖💭 While I'm still learning, I can help you with meal recommendations, chef information, ordering guidance, and general support. Try asking me about specific cuisines, dietary preferences, or how to use our platform. You can also contact our support team for detailed assistance!";
  };

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;

    const messageId = Date.now();
    const userMessage = {
      id: messageId,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    const randomDelay = Math.floor(Math.random() * 1000) + 1000; // 1-2 seconds
    setTimeout(() => {
      const botResponse = {
        id: messageId + 1,
        text: getAIResponse(currentMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, randomDelay);
  }, [inputMessage]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Show me today's meals",
    "Find Italian food",
    "Healthy options?",
    "How to order?",
    "Best rated meals",
    "Vegetarian dishes"
  ];

  const handleQuickAction = useCallback((action) => {
    setInputMessage(action);
    setTimeout(() => {
      const messageId = Date.now();
      const userMessage = {
        id: messageId,
        text: action,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);

      const randomDelay = Math.floor(Math.random() * 1000) + 1000;
      setTimeout(() => {
        const botResponse = {
          id: messageId + 1,
          text: getAIResponse(action),
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, randomDelay);
    }, 100);
  }, []);

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-full shadow-[0_10px_30px_rgba(109,183,14,0.3)] border border-[#6db70e]/30 hover:shadow-[0_15px_40px_rgba(109,183,14,0.5)] transition-all duration-300 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isOpen ? 180 : 0,
          backgroundColor: isOpen ? '#1e293b' : '#0f172a'
        }}
      >
        {isOpen ? <FiX size={24} className="text-[#6db70e]" /> : <FiMessageCircle size={24} className="text-[#6db70e]" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 border-b border-[#6db70e]/20 text-white p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6db70e]/10 border border-[#6db70e]/30 rounded-full flex items-center justify-center">
                <FiMessageCircle size={20} className="text-[#6db70e]" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tighter leading-none">
                  LocalChef<span className="text-[#6db70e]">Bazaar</span>
                </h3>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
                  AI Assistant Developed By <span className="text-[#6db70e]">Fahad Shakil</span>
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-[#6db70e] text-white' 
                        : 'bg-white border border-[#6db70e]/20 text-[#6db70e]'
                    }`}>
                      {message.sender === 'user' ? <FiUser size={16} /> : <FiMessageCircle size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-[#6db70e] text-white rounded-br-md'
                        : 'bg-white border border-slate-100 text-slate-800 rounded-bl-md'
                    }`}>
                      <p className="text-sm font-medium leading-relaxed">{message.text}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest mt-2 opacity-70 ${
                        message.sender === 'user' ? 'text-white' : 'text-slate-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <FiMessageCircle size={16} className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#6db70e] focus:bg-white transition-all text-sm font-medium text-slate-800"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="absolute right-2 top-2 p-2 bg-[#6db70e] text-white rounded-xl hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-md"
                >
                  <FiSend size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;