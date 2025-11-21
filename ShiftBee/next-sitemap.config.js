/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://shiftbee.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

