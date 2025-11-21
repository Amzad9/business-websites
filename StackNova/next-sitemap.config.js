/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://stacknova.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

