export default {
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },
      {
        name: 'content',
        title: 'Content',
        type: 'blockContent',
      },
      {
        name: 'imageUrl',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'featured',
        title: 'Featured',
        type: 'boolean',
      },
      {
        name: 'date',
        title: 'Publish Date',
        type: 'datetime',
      },
      {
        name: 'readTime',
        title: 'Read Time',
        type: 'string',
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
      },
      {
        name: 'emoji',
        title: 'Emoji',
        type: 'string',
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'string',
      },
      {
        name: 'affiliateProducts',
        type: 'array',
        title: 'Affiliate Products',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'name',
                type: 'string',
                title: 'Product Name',
                validation: Rule => Rule.required()
              },
              {
                name: 'url',
                type: 'url',
                title: 'Affiliate Link',
                validation: Rule => Rule.required()
              },
              {
                name: 'image',
                type: 'image',
                title: 'Product Image',
                options: { hotspot: true }
              },
              {
                name: 'price',
                type: 'string',
                title: 'Price',
                description: 'e.g. $29.99 or From $50'
              },
              {
                name: 'description',
                type: 'text',
                title: 'Short Description',
                rows: 3
              }
            ]
          }
        ]
      }
    ],
  }
  