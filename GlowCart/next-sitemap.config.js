/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://glowcart.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

