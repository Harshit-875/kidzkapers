import React, { useState, useEffect } from 'react';

const PartyPackages = ({onPackageSelect}) => {
  const whatsappNumber = '918600257360';
  const [activeGender, setActiveGender] = useState('boy');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const packages = {
    girl: {
      title: 'Magical Princess Party',
      tagline: 'Where dreams come true!',
      price: 'Starting @ ₹9,199',
      originalPrice: '₹11,499',
      features: [
        '👑 2 Characters (Mickey Mouse / Minnie Mouse)',
        '⏱️ 1 Hour of Fun with kids',
        '🎯 2/3 Exciting games with prizes',
        '🎥 Free video + photo shoot (mobile camera, reels, raw footage)',
        '🎂 500gm Fresh Cake',
        '🎶 Themed music',
        '🎉 2 Party poppers for surprise',
        '🎁 Small surprise gifts & chocolates',
        '🎈 Colourful balloons'
      ],
      defaultValues: {
        name: '',
        gender: 'girl',
        cakeSize:'small',
        kidsCount: 3,
        gamesCount: 2,
        giftsCount: 2,
        selectedCharacters: ['Mickey Mouse', 'Minnie Mouse'],
        shootOption: 'free',
        packageType: 'princess'
      },
      color: 'from-purple-100 to-pink-200',
      popular: true,
      cta: 'Create Fairy Tale Memories!'
    },
    boy: {
      title: 'Adventure Hero Party',
      tagline: 'For boys who dream big!',
      price: 'Starting @ ₹7,199',
      originalPrice: '₹9,499',
      features: [
        '🦸 2 Superheroes (Batman / Spiderman / Iron Man)',
        '⏱️ 1 Hour of Action-packed fun',
        '🎯 2/3 Exciting games with prizes',
        '🎥 Free video + photo shoot (mobile camera, reels, raw footage)',
        '🎂 500gm Fresh Cake',
        '🎶 Themed music',
        '🎉 2 Party poppers for surprise',
        '🎁 Small surprise gifts & chocolates',
        '🎈 Colourful balloons'
      ],
      defaultValues: {
        name: '',
        gender: 'boy',
        cakeSize:'small',
        kidsCount: 3,
        gamesCount: 2,
        giftsCount: 2,
        selectedCharacters: ['Batman', 'Spiderman'],
        shootOption: 'free',
        packageType: 'hero'
      },
      color: 'from-blue-100 to-blue-200',
      popular: false,
      cta: 'Book Your Hero Day!'
    }
  };
  
  
  // const handleBooking = (pkg) => {
  //   // Pass the package details to the parent component
  //   onPackageSelect({
  //     ...pkg.defaultValues,
  //     surpriseType: 'morning' // Default to evening surprise
  //   });
    
  //   // Scroll to the planner
  //   setTimeout(() => {
  //     document.getElementById('surprise-planner').scrollIntoView({ behavior: 'smooth' });
  //   }, 100);
  // };

  const currentPackage = packages[activeGender];

  return (
    <section id="packages" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="fredoka-700 text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 text-purple-700">
          Our <span className="text-yellow-500">Signature Packages</span> ✨
        </h2>
        <p className="text-base md:text-lg text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          All packages include setup, cleanup, and professional supervision
        </p>

        {/* Gender Toggle - Mobile Only */}
        {isMobile && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-purple-100 p-1 shadow-inner">
              <button
                onClick={() => setActiveGender('girl')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeGender === 'girl' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' 
                    : 'text-purple-700 hover:bg-purple-50'
                }`}
              >
                👸 Girls
              </button>
              <button
                onClick={() => setActiveGender('boy')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeGender === 'boy' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                    : 'text-blue-700 hover:bg-blue-50'
                }`}
              >
                🦸 Boys
              </button>
            </div>
          </div>
        )}

        {/* Packages Display */}
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 max-w-6xl mx-auto">
          {isMobile ? (
            // Mobile - Single Package View
            <div 
              className={`bg-gradient-to-br ${currentPackage.color} p-6 md:p-8 rounded-3xl shadow-lg relative transition-all hover:shadow-xl w-full`}
            >
              {currentPackage.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-purple-800 font-bold px-4 py-1 rounded-full text-xs md:text-sm">
                  BEST VALUE!
                </div>
              )}
              
              <div className="text-center mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-purple-900">{currentPackage.title}</h3>
                <p className="text-purple-700 italic text-sm md:text-base">{currentPackage.tagline}</p>
              </div>

              <div className="text-center my-4 md:my-6">
                <span className="text-3xl md:text-4xl font-bold text-purple-900">{currentPackage.price}</span>
                {currentPackage.originalPrice && (
                  <span className="ml-2 text-base md:text-lg text-gray-500 line-through">{currentPackage.originalPrice}</span>
                )}
              </div>

              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {currentPackage.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-purple-900 text-sm md:text-base">
                    <span className="mr-2 mt-0.5">✨</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleBooking(currentPackage)}
                className={`w-full ${
                  currentPackage.popular 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                } text-white font-bold py-2 md:py-3 px-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm md:text-base`}
              >
                {currentPackage.cta}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ) : (
            // Desktop - Both Packages View
            Object.entries(packages).map(([gender, pkg], index) => (
              <div 
                key={gender}
                className={`bg-gradient-to-br ${pkg.color} p-6 md:p-8 rounded-3xl shadow-lg relative transition-all hover:shadow-xl w-full md:w-[450px] ${
                  pkg.popular ? 'ring-4 ring-yellow-300 transform md:-translate-y-4' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-purple-800 font-bold px-4 py-1 rounded-full text-xs md:text-sm">
                    BEST VALUE!
                  </div>
                )}
                
                <div className="text-center mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-purple-900">{pkg.title}</h3>
                  <p className="text-purple-700 italic text-sm md:text-base">{pkg.tagline}</p>
                </div>

                <div className="text-center my-4 md:my-6">
                  <span className="text-3xl md:text-4xl font-bold text-purple-900">{pkg.price}</span>
                  {pkg.originalPrice && (
                    <span className="ml-2 text-base md:text-lg text-gray-500 line-through">{pkg.originalPrice}</span>
                  )}
                </div>

                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-purple-900 text-sm md:text-base">
                      <span className="mr-2 mt-0.5">✨</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleBooking(pkg)}
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  } text-white font-bold py-2 md:py-3 px-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm md:text-base cursor-pointer`}
                >
                  {pkg.cta}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Custom Package CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-base md:text-lg text-purple-700 mb-4 md:mb-6">
            ✨ Want to plan a full birthday party ?
          </p>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=I%20want%20to%20create%20a%20custom%20party%20package`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold px-6 py-2 md:px-8 md:py-3 rounded-full transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            🎊 Tailor the Perfect Moment
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartyPackages;