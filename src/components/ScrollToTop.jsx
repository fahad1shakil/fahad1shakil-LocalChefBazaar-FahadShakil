import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../utils/smoothScroll';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top immediately on route change
    scrollToTop({ immediate: true });
    window.scrollTo(0, 0);
    
    // Also try after a short delay to ensure rendering is complete
    const timeout = setTimeout(() => {
      scrollToTop({ immediate: true });
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
