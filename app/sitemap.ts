import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://convoforms.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://convoforms.app/forms/new',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://convoforms.app/solutions/conversational-intake-form',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://convoforms.app/solutions/ai-support-request-form',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://convoforms.app/solutions/replace-typeform-with-chat',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://convoforms.app/solutions/lead-qualification-form',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
    url: 'https://convoforms.app/solutions/research-and-surveys',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
    },
    {
    url: 'https://convoforms.app/solutions/event-registration',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
    },
    {
    url: 'https://convoforms.app/solutions/feedback-collection',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
    },

  ]
}