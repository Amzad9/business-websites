/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://streamhub.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

