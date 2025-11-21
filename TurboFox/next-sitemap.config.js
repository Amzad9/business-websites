/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://turbofox.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

