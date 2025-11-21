/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://driveloop.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

