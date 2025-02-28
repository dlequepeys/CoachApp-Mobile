export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  app: {
    head: {
      title: 'CoachApp',
      link: [{
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Poppins:wght@300;400;500&family=Abel&display=swap'
      }]
    }
  },

  css: ['~/assets/styles/main.css'],

  ssr: true,
  
  nitro: {
    preset: 'netlify-static'
  },

  compatibilityDate: '2025-02-10'
})