/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://radiusx.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

