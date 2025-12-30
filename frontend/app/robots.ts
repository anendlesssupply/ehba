import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // allow: '/',
      disallow: ['/wp-admin/', '/wp-login.php', '/xmlrpc.php'],
    },
  }
}