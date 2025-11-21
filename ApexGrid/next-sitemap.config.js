/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://apexgrid.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

