/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://finforge.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

