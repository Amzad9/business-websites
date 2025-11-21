/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://riseloop.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

