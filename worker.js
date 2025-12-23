// Cloudflare Worker to serve static files
// This Worker serves HTML, CSS, JS, and other static assets

export default {
  async fetch(request, env, ctx) {
    // Get the request URL
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Default to index.html for root path
    if (pathname === '/') {
      pathname = '/index.html';
    }

    // Remove leading slash for asset lookup
    const assetPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;

    try {
      // Try to get the asset from the site binding
      // The [site] configuration in wrangler.toml makes assets available
      const asset = await env.ASSETS.fetch(new Request(new URL(pathname, request.url)));
      
      if (asset.status === 404) {
        // If not found, try index.html
        if (pathname !== '/index.html') {
          const indexAsset = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url)));
          if (indexAsset.status !== 404) {
            return indexAsset;
          }
        }
        return new Response('File not found', { status: 404 });
      }

      return asset;
    } catch (error) {
      console.error('Error serving asset:', error);
      return new Response('Internal server error', { status: 500 });
    }
  }
};

