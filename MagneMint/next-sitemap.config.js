/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://magnemint.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

