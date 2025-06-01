import React, { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'
import { Link } from 'react-router-dom'
import imageUrlBuilder from '@sanity/image-url'
import BlogPopup from '../components/BlogPopup'

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source) => builder.image(source)

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

 // In your Blog component
const [showPopup, setShowPopup] = useState(false);

useEffect(() => {
  // Show popup after 30 seconds
  const timer = setTimeout(() => {
    // More robust localStorage check
    const hasDismissed = localStorage.getItem('popupDismissed');
    if (hasDismissed !== 'true') {  // Explicit check for string 'true'
      setShowPopup(true);
    }
  }, 5000);

  return () => {
    clearTimeout(timer);
  };
}, []); // Empty dependency array ensures this runs only once

const handleClose = () => {
  setShowPopup(false);
  localStorage.setItem('popupDismissed', 'true');
  
  // Clear after 7 days
  const dismissalTimer = setTimeout(() => {
    localStorage.removeItem('popupDismissed');
  },1000*60*60*2);
  
  return () => clearTimeout(dismissalTimer);
};

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "blog"] | order(date desc) {
          _id,
          title,
          excerpt,
          category,
          readTime,
          date,
          featured,
          emoji,
          "imageUrl": imageUrl.asset->url
        }`
      )
      .then((data) => {
        setBlogs(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Failed to load articles')
        setLoading(false)
      })
  }, [])

  const featuredArticle = blogs.find((blog) => blog.featured)
  const otherArticles = blogs.filter((blog) => !blog.featured)

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-pulse text-gray-600">Loading articles...</div>
    </div>
  )
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-red-500 bg-red-50 p-6 rounded-lg">{error}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="">
          {/* Header */}
          <div className="bg-gradient-to-br from-sky-300 via-yellow-300 to-red-400 text-center mb-12 md:mb-16 h-64 md:h-80 flex flex-col justify-center items-center p-6 md:p-8 rounded-2xl shadow-md">
            <h1 className="text-gray-900 
            text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 fredoka-700 tracking-tight">
              🎁 Gifting Ideas & Parenting Fun
            </h1>
            <p className="text-lg sm:text-xl text-gray-800 font-medium max-w-2xl mx-auto">
              Expert tips to make birthdays magical and parenting easier
            </p>
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-xl mb-12 md:mb-16 transition-all hover:shadow-2xl">
              <div className="flex flex-col lg:flex-row">
                <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between lg:w-1/2">
                  <div>
                    <div className="flex items-center mb-3 md:mb-4">
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mr-3 uppercase tracking-wider">
                        Featured
                      </span>
                      <span className="text-gray-600 text-sm font-medium">{featuredArticle.readTime}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight fredoka-700">
                      {featuredArticle.emoji} {featuredArticle.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between pt-4">
                    <span className="text-gray-500 text-sm font-medium">
                      {new Date(featuredArticle.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <Link
                      to={`/blog/${featuredArticle._id}`}
                      className="text-red-600 hover:text-red-800 font-medium flex items-center group transition-colors"
                    >
                      Read Full Article
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                {featuredArticle.imageUrl && (
                  <div className="lg:w-1/2 h-64 md:h-80 lg:h-auto">
                    <img
                      src={urlFor(featuredArticle.imageUrl).url()}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Other Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {otherArticles.map((article) => (
              <div
                key={article._id}
                className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {article.imageUrl && (
                  <div className="h-48 sm:h-52 md:h-56 overflow-hidden">
                    <img
                      src={urlFor(article.imageUrl).width(600).url()}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl mr-3">{article.emoji}</span>
                    <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 md:px-3 py-1 rounded-full uppercase tracking-wide">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 fredoka-700">
                    {article.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-5 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100 mt-auto">
                    <span className="text-gray-500 text-xs md:text-sm font-medium">
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <Link
                      to={`/blog/${article._id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center group transition-colors"
                    >
                      Read More
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

            
          {showPopup && <BlogPopup onClose={handleClose} />}

      
        </div>
      </section>
    </div>
  )
}

export default Blog