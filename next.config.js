// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
module.exports = {
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  staticPageGenerationTimeout: 3600,
  env: {
    API_URL: 'https://3jj2zsfcm6.execute-api.us-east-1.amazonaws.com/dev/api/',
    GOOGLE_API_KEY: "AIzaSyD6Huc36x8W0XJt1cUhyqCXMdQ1xiwx_Rs"
  },
}
