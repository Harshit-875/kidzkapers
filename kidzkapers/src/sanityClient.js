import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Add validation for environment variables
if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
  throw new Error('Missing Sanity project ID in environment variables')
}

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ||
  yid6cm5j,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03', // Updated to current API version
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
export default client