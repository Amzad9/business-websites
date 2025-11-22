/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://chaincraft.weblibron.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

