/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://pivotgrid.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

