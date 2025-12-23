// Cloudflare Worker to serve static files
// This Worker serves HTML, CSS, JS, and other static assets from the repository

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Default to index.html for root path
    if (pathname === '/' || pathname === '') {
      pathname = '/index.html';
    }

    try {
      // Get the asset from the ASSETS binding (configured in wrangler.toml)
      const asset = await env.ASSETS.fetch(new Request(new URL(pathname, request.url)));
      
      // If asset found, return it
      if (asset.status !== 404) {
        return asset;
      }

      // If not found and not already trying index.html, try index.html
      if (pathname !== '/index.html') {
        const indexAsset = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url)));
        if (indexAsset.status !== 404) {
          return indexAsset;
        }
      }

      return new Response('File not found', { status: 404 });
    } catch (error) {
      console.error('Error serving asset:', error);
      return new Response('Internal server error', { status: 500 });
    }
  }
};

