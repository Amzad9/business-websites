/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://loopcraft.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

