import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiClock, FiMapPin, FiUser, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiSearch, FiFilter, FiX, FiSliders } from 'react-icons/fi';

const MealsPage = () => {
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]); // Store all meals for client-side filtering
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMeals, setTotalMeals] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: { min: '', max: '' },
    rating: '',
    deliveryTime: '',
    chefExperience: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Filter Options
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert', 'Beverages'];
  const ratingOptions = ['All', '4.5+', '4.0+', '3.5+', '3.0+'];
  const deliveryTimeOptions = ['All', '15 min', '30 min', '45 min', '60 min'];
  const experienceOptions = ['All', '1+ years', '3+ years', '5+ years', '10+ years'];
  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
    { value: 'rating-desc', label: 'Rating (High to Low)' },
    { value: 'rating-asc', label: 'Rating (Low to High)' },
    { value: 'deliveryTime-asc', label: 'Delivery Time (Fast to Slow)' },
    { value: 'deliveryTime-desc', label: 'Delivery Time (Slow to Fast)' }
  ];

  const navigate = useNavigate();

  // Fetch all meals for client-side filtering
  const fetchAllMeals = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/meals?limit=1000`);
      if (res.data.success) {
        setAllMeals(res.data.data);
        setTotalMeals(res.data.data.length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters and search
  const applyFiltersAndSearch = useCallback(() => {
    let filtered = [...allMeals];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(meal =>
        meal.foodName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.chefName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (meal.ingredients && meal.ingredients.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(meal => 
        meal.category?.toLowerCase() === filters.category.toLowerCase() ||
        meal.foodName?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceRange.min) {
      filtered = filtered.filter(meal => parseFloat(meal.price) >= parseFloat(filters.priceRange.min));
    }
    if (filters.priceRange.max) {
      filtered = filtered.filter(meal => parseFloat(meal.price) <= parseFloat(filters.priceRange.max));
    }

    // Rating filter
    if (filters.rating && filters.rating !== 'All') {
      const minRating = parseFloat(filters.rating.replace('+', ''));
      filtered = filtered.filter(meal => parseFloat(meal.rating || 4.0) >= minRating);
    }

    // Delivery time filter
    if (filters.deliveryTime && filters.deliveryTime !== 'All') {
      const maxTime = parseInt(filters.deliveryTime.replace(' min', ''));
      filtered = filtered.filter(meal => parseInt(meal.estimatedDeliveryTime || 30) <= maxTime);
    }

    // Chef experience filter
    if (filters.chefExperience && filters.chefExperience !== 'All') {
      const minExp = parseInt(filters.chefExperience.replace('+ years', ''));
      filtered = filtered.filter(meal => parseInt(meal.chefExperience || 1) >= minExp);
    }

    // Sorting
    const [sortField, sortDirection] = filters.sortBy.includes('-') 
      ? filters.sortBy.split('-') 
      : [filters.sortBy, filters.sortOrder];

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'name':
          aValue = a.foodName?.toLowerCase() || '';
          bValue = b.foodName?.toLowerCase() || '';
          break;
        case 'price':
          aValue = parseFloat(a.price) || 0;
          bValue = parseFloat(b.price) || 0;
          break;
        case 'rating':
          aValue = parseFloat(a.rating) || 0;
          bValue = parseFloat(b.rating) || 0;
          break;
        case 'deliveryTime':
          aValue = parseInt(a.estimatedDeliveryTime) || 0;
          bValue = parseInt(b.estimatedDeliveryTime) || 0;
          break;
        default:
          aValue = a.foodName?.toLowerCase() || '';
          bValue = b.foodName?.toLowerCase() || '';
      }

      if (sortDirection === 'desc') {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    setFilteredMeals(filtered);
    setCurrentPage(1);
  }, [allMeals, searchTerm, filters]);

  // Get current page meals
  const getCurrentPageMeals = () => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    return filteredMeals.slice(startIndex, endIndex);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const handleSortChange = (sortValue) => {
    setFilters(prev => ({
      ...prev,
      sortBy: sortValue
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: { min: '', max: '' },
      rating: '',
      deliveryTime: '',
      chefExperience: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
    setSearchTerm('');
  };

  const handleSeeDetails = (mealId) => {
    window.scrollTo(0, 0);
    navigate(`/mealsd/${mealId}`);
  };

  useEffect(() => {
    fetchAllMeals();
  }, [fetchAllMeals]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [applyFiltersAndSearch]);

  const currentMeals = getCurrentPageMeals();
  const hasMoreToShow = currentPage * itemsPerPage < filteredMeals.length;

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="bg-[#111111] rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#242424] border-[0.5px] overflow-hidden h-[520px] animate-pulse">
      <div className="w-full h-64 bg-[#0f0f0f]"></div>
      <div className="p-6">
        <div className="h-6 bg-[#111111] rounded mb-3"></div>
        <div className="h-4 bg-[#111111] rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-[#0f0f0f] rounded mb-4 w-1/2"></div>
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 bg-[#0f0f0f] rounded w-16"></div>
          <div className="h-4 bg-[#0f0f0f] rounded w-12"></div>
        </div>
        <div className="h-10 bg-[#0f0f0f] rounded-[1rem]"></div>
      </div>
    </div>
  );

  // Meal Card Component
  const MealCard = ({ meal }) => (
    <div className="bg-white dark:bg-[#151515] rounded-[1.2rem] shadow-[0_4px_15px_rgba(0,0,0,0.02)] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col border border-slate-100 dark:border-[#242424] dark:border-[0.5px] cursor-pointer group"
      onClick={() => handleSeeDetails(meal._id)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-64 m-1.5 rounded-[0.8rem]">
        <img
          src={meal.foodImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop'}
          alt={meal.foodName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop';
          }}
        />
        <div className="absolute top-4 right-4 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] px-3 py-1.5 rounded-xl shadow-[0_4px_15px_rgba(109,183,14,0.4)] border border-[#5a9c0c] dark:border-[#7ecf55]/30 z-10 group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(109,183,14,0.6)] transition-all duration-300">
          <div className="flex items-center gap-1.5">
            <FiStar className="fill-current" size={14} />
            <span className="text-sm font-black tracking-wider">
              {meal.rating || '4.5'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 pt-1">
        {/* Title */}
        <h3 className="text-base font-black mb-1 text-slate-900 dark:text-[#e0e0e0] line-clamp-1 group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] transition-colors duration-300 tracking-tight">
          {meal.foodName}
        </h3>

        {/* Premium Ingredients Section */}
        <div className="mb-4 mt-2 h-[85px] overflow-hidden">
          <p className="text-[9px] font-black text-[#6db70e] dark:text-[#7ecf55] uppercase tracking-[0.2em] mb-2.5">Premium Ingredients</p>
          <div className="flex flex-wrap gap-1.5">
            {meal.ingredients && meal.ingredients.length > 0 ? (
              meal.ingredients.slice(0, 4).map((ing, i) => (
                <span 
                  key={i} 
                  className="max-w-[140px] truncate px-2.5 py-1 bg-slate-50 dark:bg-[#151515] text-slate-500 dark:text-[#888888] text-[10px] font-black rounded-lg border border-slate-100 dark:border-[#242424] dark:border-[0.5px] group-hover:bg-[#6db70e]/5 dark:group-hover:bg-[#7ecf55]/5 group-hover:border-[#6db70e]/20 dark:group-hover:border-[#7ecf55]/20 group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] transition-all duration-300"
                  title={ing}
                >
                  {ing}
                </span>
              ))
            ) : (
              ['Organic', 'Fresh', 'Local'].map((tag, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-50 text-slate-400 text-[10px] font-black rounded-lg border border-slate-100">
                  {tag}
                </span>
              ))
            )}
            {meal.ingredients?.length > 4 && (
              <span className="px-2.5 py-1 bg-slate-50 text-slate-400 text-[10px] font-black rounded-lg border border-slate-100">
                +{meal.ingredients.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Meta Info */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1 text-slate-400 font-bold">
              <FiUser className="text-[#6db70e]" size={10} />
              <span>{meal.chefName}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 font-bold">
              <FiClock className="text-slate-900" size={10} />
              <span>{meal.estimatedDeliveryTime || '30'}m</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-[10px] mt-1.5">
            <div className="flex items-center gap-1 text-slate-400 dark:text-[#888888] font-bold">
              <FiMapPin className="text-slate-900 dark:text-[#7ecf55]" size={10} />
              <span className="truncate max-w-[80px]">{meal.chefLocation || 'Local'}</span>
            </div>
            <div className="bg-[#6db70e]/10 dark:bg-[#7ecf55]/10 text-[#6db70e] dark:text-[#7ecf55] px-2 py-0.5 rounded border border-[#6db70e]/10 dark:border-[#7ecf55]/10 group-hover:bg-[#6db70e] dark:group-hover:bg-[#7ecf55] group-hover:text-white dark:group-hover:text-[#0f0f0f] transition-colors duration-300 shadow-sm">
              <span className="text-base font-black tracking-tighter">
                ${meal.price}
              </span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent double click from card
            handleSeeDetails(meal._id);
          }}
          className="w-full flex items-center justify-center gap-1.5 bg-slate-900 dark:bg-[#151515] text-white dark:text-[#e0e0e0] py-2 rounded-[0.8rem] font-black text-[11px] uppercase tracking-wider hover:bg-[#6db70e] dark:hover:bg-[#7ecf55] dark:hover:text-[#0f0f0f] transition-all duration-300 cursor-pointer border dark:border-[#242424] dark:border-[0.5px]"
        >
          Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] py-16 font-sans transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <title>LocalChefBazaar || Meals</title>
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-3 text-slate-900 dark:text-[#e0e0e0] tracking-tighter uppercase leading-none">
            Marketplace <span className="text-[#6db70e] dark:text-[#7ecf55]">Menu</span>
          </h1>
          <div className="w-20 h-1 bg-[#6db70e] dark:bg-[#7ecf55] mx-auto mb-4 rounded-full" />
          <p className="text-xs md:text-sm lg:text-lg text-slate-500 dark:text-[#888888] font-bold uppercase tracking-[0.2em] max-w-2xl mx-auto px-4">
            Discover premium home-cooked meals from top local chefs
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-[#151515] rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_10px_50px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] p-4 md:p-8 lg:p-10 mb-8 md:mb-16">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
            <div className="flex-1 w-full relative group">
              <FiSearch className="absolute left-5 md:left-6 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-[#6db70e] dark:group-focus-within:text-[#7ecf55] transition-colors" size={18} />
              <input
                type="search"
                placeholder={window.innerWidth < 768 ? "Search meals..." : "Search premium meals, chefs, or ingredients..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3.5 md:py-5 bg-slate-50 dark:bg-[#151515] border-2 border-slate-100 dark:border-[#242424] rounded-2xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold placeholder-slate-400 dark:placeholder-slate-600 transition-all duration-300 outline-none text-sm md:text-base"
              />
            </div>
            
            <div className="flex w-full lg:w-auto gap-3 md:gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300 ${
                  showFilters 
                    ? 'bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] shadow-[0_8px_20px_rgba(109,183,14,0.3)]' 
                    : 'bg-slate-900 dark:bg-[#151515] text-white dark:text-[#e0e0e0] border dark:border-[#242424] dark:border-[0.5px] hover:bg-[#6db70e] dark:hover:bg-[#7ecf55] dark:hover:text-[#0f0f0f] hover:shadow-[0_8px_20px_rgba(109,183,14,0.3)]'
                }`}
              >
                <FiSliders size={16} />
                <span>Filters</span>
              </button>
              
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="flex-1 lg:flex-none px-4 md:px-6 py-3.5 md:py-5 bg-slate-50 dark:bg-[#151515] border-2 border-slate-100 dark:border-[#242424] rounded-2xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-black text-xs md:text-sm outline-none cursor-pointer transition-all duration-300 appearance-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-slate-100 pt-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border-2 border-slate-100 dark:border-[#242424] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold outline-none transition-all text-xs"
                  >
                    {categories.map(category => (
                      <option key={category} value={category === 'All' ? '' : category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                      className="w-full px-3 py-3 bg-slate-50 dark:bg-[#151515] border-2 border-slate-100 dark:border-[#242424] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold outline-none transition-all text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                      className="w-full px-3 py-3 bg-slate-50 dark:bg-[#151515] border-2 border-slate-100 dark:border-[#242424] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold outline-none transition-all text-xs"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">
                    Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border-2 border-slate-100 dark:border-[#242424] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold outline-none transition-all text-xs"
                  >
                    {ratingOptions.map(rating => (
                      <option key={rating} value={rating === 'All' ? '' : rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Time Filter */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">
                    Delivery Time
                  </label>
                  <select
                    value={filters.deliveryTime}
                    onChange={(e) => handleFilterChange('deliveryTime', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border-2 border-slate-100 dark:border-[#242424] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold outline-none transition-all text-xs"
                  >
                    {deliveryTimeOptions.map(time => (
                      <option key={time} value={time === 'All' ? '' : time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Chef Experience Filter */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">
                    Chef Exp.
                  </label>
                  <select
                    value={filters.chefExperience}
                    onChange={(e) => handleFilterChange('chefExperience', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151515] border-2 border-slate-100 dark:border-[#242424] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold outline-none transition-all text-xs"
                  >
                    {experienceOptions.map(exp => (
                      <option key={exp} value={exp === 'All' ? '' : exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest bg-slate-50 dark:bg-[#151515] px-4 py-2 rounded-full border border-slate-100 dark:border-[#242424] dark:border-[0.5px]">
                  {filteredMeals.length} premium results
                </div>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-6 py-2.5 text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-all border border-slate-200 dark:border-slate-800 rounded-full hover:border-red-500"
                >
                  <FiX />
                  Reset Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Active Filters Display */}
          {(searchTerm || filters.category || filters.priceRange.min || filters.priceRange.max || filters.rating || filters.deliveryTime || filters.chefExperience) && (
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
              {searchTerm && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs uppercase tracking-wider">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:text-red-500">
                    <FiX size={16} />
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6db70e]/10 text-[#6db70e] font-bold rounded-xl text-xs uppercase tracking-wider">
                  Category: {filters.category}
                  <button onClick={() => handleFilterChange('category', '')} className="hover:text-red-500">
                    <FiX size={16} />
                  </button>
                </span>
              )}
              {(filters.priceRange.min || filters.priceRange.max) && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6db70e]/10 text-[#6db70e] font-bold rounded-xl text-xs uppercase tracking-wider">
                  Price: ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
                  <button onClick={() => handlePriceRangeChange('min', '') || handlePriceRangeChange('max', '')} className="hover:text-red-500">
                    <FiX size={16} />
                  </button>
                </span>
              )}
              {filters.rating && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider">
                  Rating: {filters.rating}
                  <button onClick={() => handleFilterChange('rating', '')} className="hover:text-red-500">
                    <FiX size={16} />
                  </button>
                </span>
              )}
              {filters.deliveryTime && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6db70e]/10 text-[#6db70e] font-bold rounded-xl text-xs uppercase tracking-wider">
                  Delivery: {filters.deliveryTime}
                  <button onClick={() => handleFilterChange('deliveryTime', '')} className="hover:text-red-500">
                    <FiX size={16} />
                  </button>
                </span>
              )}
              {filters.chefExperience && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider">
                  Experience: {filters.chefExperience}
                  <button onClick={() => handleFilterChange('chefExperience', '')} className="hover:text-red-500">
                    <FiX size={16} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {loading ? (
            // Skeleton Loading
            Array.from({ length: 12 }, (_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : currentMeals.length > 0 ? (
            // Actual Meals
            currentMeals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))
          ) : (
            // No Results
            <div className="col-span-full text-center py-24 bg-white dark:bg-[#151515] rounded-[2rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-sm">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-[#e0e0e0] mb-2 tracking-tight">
                No meals found
              </h3>
              <p className="text-slate-500 dark:text-[#888888] font-medium mb-8">
                Try adjusting your search terms or filters to find what you're looking for
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-4 bg-[#6db70e] dark:bg-[#7ecf55] hover:bg-[#5a9c0c] text-white dark:text-[#0f0f0f] rounded-2xl font-black shadow-[0_8px_20px_rgba(109,183,14,0.3)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Load More / Pagination */}
        {!loading && currentMeals.length > 0 && (
          <div className="flex flex-col items-center gap-6">
            {/* Load More Button */}
            {hasMoreToShow && (
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-[#151515] hover:bg-[#6db70e] dark:hover:bg-[#7ecf55] text-white dark:text-[#e0e0e0] dark:hover:text-[#0f0f0f] font-black rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_20px_rgba(109,183,14,0.4)] transform hover:-translate-y-1 transition-all duration-300 group border dark:border-[#242424] dark:border-[0.5px]"
              >
                <span>Load More Meals</span>
                <FiChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Results Info */}
            <div className="text-center">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                Showing {currentMeals.length} of {filteredMeals.length} meals
                {filteredMeals.length !== totalMeals && (
                  <span className="text-slate-400"> (filtered from {totalMeals} total)</span>
                )}
              </p>
              {!hasMoreToShow && filteredMeals.length > 12 && (
                <p className="text-sm font-bold text-[#6db70e] mt-3 uppercase tracking-widest">
                  🎉 You've seen all filtered results!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealsPage;
