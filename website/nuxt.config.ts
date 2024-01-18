// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'/*, '@fortawesome/fontawesome-svg-core/styles.css'*/],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  /*plugins: [
    { src: "~/plugins/font-awesome.ts" }
  ],*/
  modules: ['@nuxtjs/strapi'],
  strapi: {
    devtools: true
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap"
        }
      ]
    },
  },
  /*it can be useful
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE
    }
  }*/
})
