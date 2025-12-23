// Cloudflare Pages Function to serve download files from R2
// This function handles requests to /downloads/* and serves files from R2
// with download headers
//
// Usage:
// - Upload files to your R2 bucket
// - Access via: https://yourdomain.com/downloads/filename.pdf
// - Files will be downloaded instead of displayed in browser

export const onRequest: PagesFunction<{ R2_ASSETS: R2Bucket }> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Extract the file path from /downloads/filename
  const path = url.pathname.replace('/downloads/', '');
  
  if (!path) {
    return new Response('File path required', { status: 400 });
  }

  try {
    // Get the file from R2
    const object = await env.R2_ASSETS.get(`downloads/${path}`);
    
    if (!object) {
      return new Response('File not found', { status: 404 });
    }

    // Get the file's content type
    const contentType = object.httpMetadata?.contentType || 'application/octet-stream';
    const filename = path.split('/').pop() || 'download';
    
    // Return the file with download headers
    return new Response(object.body, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=604800', // Cache for 1 week
      },
    });
  } catch (error) {
    console.error('Error serving download from R2:', error);
    return new Response('Internal server error', { status: 500 });
  }
};

