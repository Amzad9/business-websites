/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://zestforge.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

