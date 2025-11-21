/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://fluxbridge.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

