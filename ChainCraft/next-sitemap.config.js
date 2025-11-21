/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://chaincraft.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

