import { Link, useLocation } from "react-router-dom";
import React from "react";

const Footer = () => {
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <footer className="bg-gradient-to-br from-blue-600 to-purple-800 text-white py-6 px-4 sm:py-12 sm:px-6 text-xs sm:text-sm">
      <div className="container mx-auto max-w-7xl">
        {/* Mobile Layout */}
        <div className="sm:hidden grid grid-cols-2 gap-4 mb-6">
          {/* Brand Column */}
          <div className="col-span-2 space-y-2">
            <div className="flex items-center">
              <span className="text-2xl mr-1">🎊</span>
              <h3 className="text-lg font-bold font-fredoka">Kidz Kapers</h3>
            </div>
            <p className="text-blue-100 leading-tight">
              Making birthday dreams come true in Nagpur!
            </p>
            <div className="flex space-x-2 pt-1">
              <Link to="#" className="text-white hover:text-pink-400 text-lg">📷</Link>
              <Link to="#" className="text-white hover:text-green-400 text-lg">💬</Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-bold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/" 
                  className={`block py-0.5 ${
                    isActive('/') ? 'text-yellow-300' : 'text-blue-100 hover:text-yellow-300'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className={`block py-0.5 ${
                    isActive('/blog') ? 'text-yellow-300' : 'text-blue-100 hover:text-yellow-300'
                  }`}
                >
                  Blog & Tips
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className={`block py-0.5 ${
                    isActive('/gallery') ? 'text-yellow-300' : 'text-blue-100 hover:text-yellow-300'
                  }`}
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold mb-2">Services</h4>
            <ul className="space-y-1">
              <li><Link to="#" className="text-blue-100 hover:text-yellow-300 block py-0.5">Morning</Link></li>
              <li><Link to="#" className="text-blue-100 hover:text-yellow-300 block py-0.5">Evening</Link></li>
              <li><Link to="#" className="text-blue-100 hover:text-yellow-300 block py-0.5">Characters</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 mt-2">
            <h4 className="font-bold mb-2">Contact</h4>
            <ul className="space-y-1 text-blue-100">
              <li className="flex items-center">
                <span className="mr-1">📱</span>
                <Link to="tel:+918600257360" className="hover:text-yellow-300">+91 86002 57360</Link>
              </li>
              <li className="flex items-center">
                <span className="mr-1">✉️</span>
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=kidzkapers@gmail.com&su=Kidz Kapers Enquiry" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300"
                >
                  kidzkapers@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-1">📸</span>
                <a 
                  href="https://instagram.com/kidzkapers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-1">🔗</span>
                <a 
                  href="https://linkedin.com/company/kidzkapers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300"
                >
                  LinkedIn
                </a>
              </li>
              <li className="mt-2">
                <Link 
                  to="https://wa.me/918600257360" 
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs"
                >
                  <span className="mr-1">💬</span> WhatsApp
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-3xl mr-2">🎊</span>
                <h3 className="text-2xl font-bold font-fredoka">Kidz Kapers</h3>
              </div>
              <p className="text-blue-100">
                Making birthday dreams come true in Nagpur! Magical surprises for your little ones.
              </p>
              <div className="flex space-x-4 pt-2">
                <Link to="#" className="text-white hover:text-pink-400 transition-colors text-2xl">📷</Link>
                <Link to="#" className="text-white hover:text-green-400 transition-colors text-2xl">💬</Link>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-lg font-bold mb-4 pb-2 border-b border-blue-500">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/" 
                    className={`flex items-center transition-colors ${
                      isActive('/') ? 'text-yellow-300' : 'text-blue-100 hover:text-yellow-300'
                    }`}
                  >
                   <span className="mr-2">🏠</span> Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className={`flex items-center transition-colors ${
                      isActive('/blog') ? 'text-yellow-300' : 'text-blue-100 hover:text-yellow-300'
                    }`}
                  >
                    <span className="mr-2">🎁</span> Blog & Tips
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/gallery" 
                    className={`flex items-center transition-colors ${
                      isActive('/gallery') ? 'text-yellow-300' : 'text-blue-100 hover:text-yellow-300'
                    }`}
                  >
                    <span className="mr-2">🎥</span> Video Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-lg font-bold mb-4 pb-2 border-b border-blue-500">Our Services</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-blue-100 hover:text-yellow-300 flex items-center transition-colors"><span className="mr-2">🌞</span> Morning Surprises</Link></li>
                <li><Link to="#" className="text-blue-100 hover:text-yellow-300 flex items-center transition-colors"><span className="mr-2">🌙</span> Evening Parties</Link></li>
                <li><Link to="#" className="text-blue-100 hover:text-yellow-300 flex items-center transition-colors"><span className="mr-2">🦸</span> Character Visits</Link></li>
                <li><Link to="#" className="text-blue-100 hover:text-yellow-300 flex items-center transition-colors"><span className="mr-2">🎂</span> Birthday Cakes</Link></li>
                <li><Link to="#" className="text-blue-100 hover:text-yellow-300 flex items-center transition-colors"><span className="mr-2">🎮</span> Fun Games</Link></li>
                <li><Link to="#" className="text-blue-100 hover:text-yellow-300 flex items-center transition-colors"><span className="mr-2">📹</span> Video Shoots</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-lg font-bold mb-4 pb-2 border-b border-blue-500">Contact Us</h4>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📍</span>
                  <span>Nagpur, Maharashtra</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📱</span>
                  <Link to="tel:+918600257360" className="hover:text-yellow-300 transition-colors">+91 86002 57360</Link>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✉️</span>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=kidzkapers@gmail.com&su=Kidz Kapers Enquiry" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-yellow-300 transition-colors"
                  >
                    kidzkapers@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📸</span>
                  <a 
                    href="https://instagram.com/kidzkapers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔗</span>
                  <a 
                    href="https://linkedin.com/company/kidzkapers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-yellow-300 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🕐</span>
                  <span>Mon-Sun: 8 AM - 8 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-blue-500 pt-6">
            <p className="text-center text-blue-200">
              © {new Date().getFullYear()} Kidz Kapers. All rights reserved. Made with <span className="text-red-400">❤️</span> for kids in Nagpur!
            </p>
          </div>
        </div>

        {/* Mobile Copyright */}
        <div className="sm:hidden border-t border-blue-500 pt-3 text-center">
          <p className="text-blue-200 text-xs">
            © {new Date().getFullYear()} Kidz Kapers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
