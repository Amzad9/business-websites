/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://codecrate.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

