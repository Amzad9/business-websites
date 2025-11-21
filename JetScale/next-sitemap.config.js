/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://jetscale.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

