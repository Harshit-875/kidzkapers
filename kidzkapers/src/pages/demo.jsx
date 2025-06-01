import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import sanityClient from '../sanityClient'
import { PortableText } from '@portabletext/react'
import { urlFor } from '../sanityClient' // Make sure you have this configured

const BlogDetail = () => {
  // ... existing state and useEffect ...
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
          affiliateProducts[] {
            name,
            url,
            description,
            price,
            "image": image.asset->
          },
          "imageUrl": imageUrl.asset->url
        }`
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
      <div className="animate-pulse text-gray-500">Loading article...</div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 max-w-md text-center p-6 bg-red-50 rounded-lg">
        {error}
        <Link to="/blog" className="mt-4 block text-blue-600 hover:underline">
          ← Back to all articles
        </Link>
      </div>
    </div>
  )

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ... existing header content ... */}
      <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all articles
            </Link>
      
            <header className="mb-10">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {blog.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight font-serif">
                {blog.emoji} {blog.title}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-6">
                <span className="mr-4">
                  {new Date(blog.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span>•</span>
                <span className="mx-4">{blog.readTime}</span>
                {blog.author && (
                  <div className="flex items-center ml-4">
                    {blog.author.avatar && (
                      <img 
                        src={blog.author.avatar} 
                        alt={blog.author.name} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <span className="text-gray-700">{blog.author.name}</span>
                  </div>
                )}
              </div>
      
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="rounded-xl mb-8 w-full object-cover max-h-[32rem] shadow-lg"
                  loading="lazy"
                />
              )}
      
              {blog.excerpt && (
                <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl">
                  {blog.excerpt}
                </p>
              )}
            </header>

      {/* Main content with affiliate products */}
      <div className="prose prose-lg max-w-none mb-12">
        {blog.content && <PortableText value={blog.content} />}
      </div>

      {/* Affiliate Products Section */}
      {blog.affiliateProducts?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif border-b pb-2">
            Recommended Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blog.affiliateProducts.map((product, index) => (
              <div 
                key={index}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                {product.image && (
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
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
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors"
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
          <p className="text-sm text-gray-500 mt-4">
            Disclosure: These are affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </section>
      )}

      {/* ... rest of your component ... */}
    </article>
  )
}

export default BlogDetail