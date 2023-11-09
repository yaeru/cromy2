// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@samk-dev/nuxt-uikit3'],

  supabase: {
    redirect: false
  }
  
})
