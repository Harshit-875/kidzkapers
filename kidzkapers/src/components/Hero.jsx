import React from 'react';
import { HashLink } from 'react-router-hash-link';

function Hero() {
  const scrollWithOffset = (el) => {
    if (!el) return;
  
    const headerOffset = window.innerWidth <= 768 ? 60 : 80;
  
    // Safely get scroll position
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  
    // Element's position relative to the document
    const elementTop = el.getBoundingClientRect().top + scrollTop;
  
    // Viewport height (dynamic on mobile due to address bar)
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  
    // Final scroll target that centers the element
    const scrollTarget = elementTop - (viewportHeight / 2) + (el.offsetHeight / 2) - headerOffset;
  
    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });
  };
  
  
  

  return (
    <section className="bg-gradient-to-br from-sky-300 via-yellow-300 to-red-400 min-h-[70vh] md:min-h-[80vh] flex items-center pt-20 pb-16 px-4">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-gray-900 fredoka-700 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Magical Birthday Surprises for Kids in Nagpur <span className="text-4xl sm:text-5xl">🎉</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-10 md:mb-12 leading-relaxed">
            Make your child's day unforgettable with Kidz Kapers – surprise characters, fun games, sweet treats, and lots of joy!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <HashLink
              scroll={scrollWithOffset}
              to="#surprise-planner"
              className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-red-600 font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">📅</span> Plan Your Surprise Now
            </HashLink>
            
            <a
              href="tel:918600257360"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-blue-600 font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">📞</span> Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;