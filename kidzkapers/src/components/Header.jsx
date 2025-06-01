import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import whatsapp from '../assets/whatsapp.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const whatsappNumber = '918600257360';
  const phoneNumber = '8600257360';

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  const handleContactClick = () => {
    window.open(`tel:${phoneNumber}`, '_blank');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Kidz Kapers"
              className="max-h-12 h-auto w-auto mr-2"
            />
            <span className="fredoka-700 text-2xl md:text-2xl text-[#0080ff]">
              Kidz Kapers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className={`font-medium hover:text-red-600 transition-colors px-2 py-1 ${isActive('/') ? 'text-red-600' : 'text-blue-800'
                }`}
            >
              🏠 Home
            </Link>
            <Link
              to="/blog"
              className={`font-medium hover:text-red-600 transition-colors px-2 py-1 ${isActive('/blog') ? 'text-red-600' : 'text-blue-800'
                }`}
            >
              🎁 Blog
            </Link>
            <Link
              to="/gallery"
              className={`font-medium hover:text-red-600 transition-colors px-2 py-1 ${isActive('/gallery') ? 'text-red-600' : 'text-blue-800'
                }`}
            >
              🎥 Videos
            </Link>
            <Link
              to="/about"
              className={`font-medium hover:text-red-600 transition-colors px-2 py-1 ${isActive('/about') ? 'text-red-600' : 'text-blue-800'
                }`}
            >
              🎈 About Us
            </Link>

            <div className="flex space-x-3 ml-4">
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow-md transition-colors flex items-center text-sm md:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.91c.545 1.37 1.677 2.543 3.045 3.109.543.227 1.035.318 1.48.318.38 0 .743-.057 1.072-.159.947-.293 1.684-1.039 1.684-1.039l-.117-.078c-.405-.27-.992-.662-1.27-.846-.272-.186-.47-.31-.653-.31-.173 0-.347.074-.52.372-.173.297-.662.865-.91 1.164-.248.297-.495.347-.843.149-.347-.198-1.465-.541-2.39-1.654-.92-1.114-1.15-2.077-1.027-2.427.124-.347.692-.409.989-.223.297.186.99.669 1.175.966.186.297.248.446.372.446.124 0 .272-.074.446-.223.173-.149.744-.818 1.01-1.087.264-.27.528-.347.792-.347.248 0 .372.025.545.124.173.1.433.319.644.54.213.223.426.52.604.818.178.297.38.694.446.893.064.199.128.595-.055 1.162-.181.558-.694 1.18-1.151 1.58-.462.4-.89.669-1.49.977-.595.309-.96.463-1.29.463z" />
                </svg>
                WhatsApp
              </button>
              <button
                onClick={handleContactClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium shadow-md transition-colors flex items-center text-sm md:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <div className="flex space-x-2 mr-2">
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-500 rounded-full p-2 shadow-md transition-colors"
                aria-label="WhatsApp"
              >
                <img src={whatsapp} alt="WhatsApp" className="h-5 w-5" />
              </button>
              <button
                onClick={handleContactClick}
                className="bg-blue-500 text-white p-2 rounded-full shadow-md transition-colors flex items-center"
                aria-label="Call Us"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {/* <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0
::contentReference[oaicite:0]{index=0}
                   fill="currentColor"
                > */}
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </button>
            </div>

            {/* Hamburger Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="text-blue-800 focus:outline-none"
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white shadow-md transition-all duration-300 px-4 pt-4 pb-6 space-y-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-medium hover:text-red-600 ${isActive('/') ? 'text-red-600' : 'text-blue-800'
                }`}
            >
              🏠 Home
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-medium hover:text-red-600 ${isActive('/blog') ? 'text-red-600' : 'text-blue-800'
                }`}
            >
              🎁 Blog
            </Link>
            <Link
              to="/gallery"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-medium hover:text-red-600 ${isActive('/gallery') ? 'text-red-600' : 'text-blue-800'
                }`}
            >
              🎥 Videos
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-medium hover:text-red-600 ${isActive('/about') ? 'text-red-600' : 'text-blue-800'
                }`}
            >
              🎈 About Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
