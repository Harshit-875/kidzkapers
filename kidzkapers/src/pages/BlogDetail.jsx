import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import sanityClient from '../sanityClient'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'

// Create URL builder
const builder = imageUrlBuilder(sanityClient)
const urlFor = (source) => builder.image(source)

const BlogDetail = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "blog" && _id == $id][0] {
          _id,
          title,
          excerpt,
          content,
          category,
          readTime,
          date,
          featured,
          emoji,
          author->{
            name,
            "avatar": avatar.asset->url
          },
          affiliateProducts[] {
            name,
            url,
            description,
            price,
            "image": image.asset->
          },
          "imageUrl": imageUrl.asset->url
        }`,
        { id }
      )
      .then((data) => {
        if (!data) {
          setError('Article not found')
        } else {
          setBlog(data)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setError('Failed to load article')
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Oops!</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link 
          to="/blog" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          ← Back to all articles
        </Link>
      </div>
    </div>
  )

  if (!blog) return null

  return (
    <div className="bg-white">
      <article className="pt-20 max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Back button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8 group"
        >
          <svg 
            className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all articles
        </Link>
        
        {/* Article header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
              {blog.category}
            </span>
            {blog.featured && (
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight font-serif">
            <span className="mr-2" role="img" aria-label="Emoji">{blog.emoji}</span>
            {blog.title}
          </h1>
          
          {/* Author and metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-6 gap-2 sm:gap-4">
            {blog.author && (
              <div className="flex items-center">
                {blog.author.avatar && (
                  <img 
                    src={urlFor(blog.author.avatar).width(40).height(40).url()}
                    alt={blog.author.name} 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 object-cover"
                    loading="lazy"
                  />
                )}
                <span className="text-gray-700 font-medium">{blog.author.name}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm sm:text-base">
              <span>
                {new Date(blog.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="mx-2 sm:mx-3 text-gray-400">•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Featured image */}
          {blog.imageUrl && (
            <div className="rounded-xl mb-8 overflow-hidden shadow-lg">
              <img
                src={urlFor(blog.imageUrl).width(1200).url()}
                alt={blog.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl">
              {blog.excerpt}
            </p>
          )}
        </header>

        {/* Article content */}
        {/* <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none mb-16">
          {blog.content && <PortableText value={blog.content} />}
        </div> */}

        {/* Affiliate products */}
        {blog.affiliateProducts?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif border-b pb-2">
              Recommended Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blog.affiliateProducts.map((product, index) => (
                <div 
                  key={index}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-gray-50"
                >
                  {product.image && (
                    <div className="h-48 sm:h-56 bg-gray-100 overflow-hidden">
                      <img
                        src={urlFor(product.image).width(600).url()}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-lg sm:text-xl mb-2">{product.name}</h3>
                    {product.price && (
                      <p className="text-gray-700 font-medium mb-3">{product.price}</p>
                    )}
                    {product.description && (
                      <p className="text-gray-600 mb-4">{product.description}</p>
                    )}
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors w-full sm:w-auto text-center"
                    >
                      View Product
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 italic">
              Disclosure: These are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </section>
        )}

        {/* Back to top button for mobile */}
        <div className="md:hidden fixed bottom-6 right-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </article>
    </div>
  )
}

export default BlogDetail