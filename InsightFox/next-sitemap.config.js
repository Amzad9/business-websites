/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://insightfox.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

