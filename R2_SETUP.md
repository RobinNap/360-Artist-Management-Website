# R2 Storage Setup Guide

This guide explains how to set up and use Cloudflare R2 with your site.

## Step 1: Create R2 Buckets

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2** in the sidebar
3. Click **Create bucket**
4. Name it `360-artist-assets` (or match the name in `wrangler.toml`)
5. Choose a location (or leave default)
6. Click **Create bucket**

## Step 2: Upload Files to R2

You can upload files via:
- **Cloudflare Dashboard**: R2 > Your bucket > Upload
- **Wrangler CLI**: `wrangler r2 object put <key> --file=<path> --bucket=<bucket-name>`
- **R2 API**: Use the S3-compatible API

### Recommended Structure:
```
360-artist-assets/
├── downloads/
│   ├── Booking Agreement Example.pdf
│   ├── Budgeting Example Sheet.xlsx
│   └── ...
├── Course Material PDF/
│   ├── Bookings/
│   ├── Branding/
│   └── ...
└── images/
    └── (large images if needed)
```

## Step 3: Configure Access

### Option A: Use Pages Functions (Recommended)
- Files are served through your domain
- Better control over caching and headers
- No egress fees
- Use the functions in `/functions/` directory

### Option B: Public R2 URLs
1. In R2 bucket settings, enable **Public Access**
2. Get public URLs for files
3. Update your HTML to use R2 URLs directly

## Step 4: Update Your Code

### Using Pages Functions:
```html
<!-- Instead of: -->
<a href="../../assets/downloads/file.pdf">Download</a>

<!-- Use: -->
<a href="/downloads/file.pdf">Download</a>
```

### Using Public R2 URLs:
```html
<a href="https://pub-xxxxx.r2.dev/bucket-name/path/to/file.pdf">Download</a>
```

## Step 5: Deploy

1. Make sure `wrangler.toml` has the R2 bucket binding configured
2. Deploy your Pages site
3. The functions in `/functions/` will automatically handle R2 requests

## Benefits of R2

- ✅ No egress fees (unlike S3)
- ✅ No per-file size limits (unlike Workers assets)
- ✅ Global CDN distribution
- ✅ S3-compatible API
- ✅ Cost-effective storage

## Migration Tips

1. **Start with large files**: Move PDFs and large images first
2. **Test locally**: Use `wrangler pages dev` to test functions
3. **Update links gradually**: You can keep some files in static assets
4. **Monitor usage**: Check R2 usage in Cloudflare Dashboard

## Troubleshooting

- **404 errors**: Check bucket name matches `wrangler.toml`
- **Permission errors**: Verify R2 bucket binding in Pages settings
- **Slow loading**: Check cache headers in functions

