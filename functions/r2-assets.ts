// Cloudflare Pages Function to serve files from R2
// This function handles requests to /r2/* and serves files from your R2 bucket
// 
// Usage: 
// - Upload files to your R2 bucket (e.g., "360-artist-assets")
// - Access via: https://yourdomain.com/r2/path/to/file.pdf
//
// Make sure to bind your R2 bucket in wrangler.toml as "ASSETS"

export const onRequest: PagesFunction<{ ASSETS: R2Bucket }> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Extract the file path from /r2/path/to/file
  const path = url.pathname.replace('/r2/', '');
  
  if (!path) {
    return new Response('File path required', { status: 400 });
  }

  try {
    // Get the file from R2
    const object = await env.ASSETS.get(path);
    
    if (!object) {
      return new Response('File not found', { status: 404 });
    }

    // Get the file's content type
    const contentType = object.httpMetadata?.contentType || 'application/octet-stream';
    
    // Return the file with appropriate headers
    return new Response(object.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Disposition': `inline; filename="${path.split('/').pop()}"`,
      },
    });
  } catch (error) {
    console.error('Error serving file from R2:', error);
    return new Response('Internal server error', { status: 500 });
  }
};

