const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const sitemap = new SitemapStream({ hostname: 'https://harsh-suthar-portfolio.netlify.app/' });

sitemap.write({ url: '/' });
sitemap.write({ url: '/contact' }); // example page
sitemap.write({ url: '/about' });   // example page
sitemap.end();

streamToPromise(sitemap).then(data => {
  createWriteStream('./public/sitemap.xml').end(data);
});
