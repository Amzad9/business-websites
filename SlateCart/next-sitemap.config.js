/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://slatecart.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

