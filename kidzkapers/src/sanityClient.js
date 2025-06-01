import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;

const client = createClient({
  projectId: projectId,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

export default client