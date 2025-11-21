/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://wirefox.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

