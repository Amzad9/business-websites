/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://signalfox.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

