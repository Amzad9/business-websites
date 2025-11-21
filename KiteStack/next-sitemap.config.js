/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://kitestack.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

