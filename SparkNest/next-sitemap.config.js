/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sparknest.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

