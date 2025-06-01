// src/components/BlogPopup.jsx
import { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'

const scrollWithOffset = (el) => {
    if (!el) return;
  
    const headerOffset = window.innerWidth <= 768 ? 60 : 80;
  
    // Ensure DOM is ready and handle mobile height correctly
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const elementTop = el.getBoundingClientRect().top + scrollTop;
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    const scrollTarget = elementTop - (viewportHeight / 2) + (el.offsetHeight / 2) - headerOffset;
  
    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  };

const BlogPopup = ({ onClose }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/', { state: { scrollTo: 'target-id' } });
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Popup Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 z-50 transform transition-all duration-300 scale-100">
                <img
                    src={logo} // Replace with your own image path
                    alt="Surprise Gift"
                    className="w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
                    Want to plan a surprise for your kid?
                </h3>
                <p className="text-gray-600 text-center mb-6 text-base sm:text-lg">
                    We’ll help you create magical moments they’ll never forget!
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    <HashLink
                        smooth
                        scroll={scrollWithOffset}
                        to="/#surprise-planner"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full shadow-lg transition duration-300 ease-in-out"
                        onClick={() => {
                            onClose();
                            handleClick();
                        }}
                    >
                        Yes, Let's Plan!
                    </HashLink>
                    <button
                        onClick={onClose}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-full shadow-sm transition duration-200"
                    >
                        Not Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogPopup;
