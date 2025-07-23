// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  axios: {
    baseURL: 'http://localhost:8000/api/', // La URL de tu backend
  },
  // Puedes añadir más configuración para CSS, plugins, etc.
})
