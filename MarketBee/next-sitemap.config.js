/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://marketbee.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

