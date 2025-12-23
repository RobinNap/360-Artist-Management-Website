# R2 Upload Instructions

## Important: Fix Deploy Command First

**Before uploading to R2, you MUST remove the deploy command in Cloudflare Dashboard:**

1. Go to Cloudflare Dashboard > Workers & Pages > Your Project > Settings
2. Click "Edit" next to Build configuration
3. **Delete** the "Deploy command" field (remove `npx wrangler deploy`)
4. **Delete** the "Non-production branch deploy command" field
5. Click "Update"

This will allow Cloudflare Pages to deploy automatically without errors.

## Upload Methods

### Method 1: Using Wrangler CLI (Recommended)

**Prerequisites:**
```bash
npm install -g wrangler
wrangler login
```

**Upload:**
```bash
chmod +x upload-to-r2.sh
./upload-to-r2.sh
```

### Method 2: Using S3-Compatible API (Node.js)

**Prerequisites:**
```bash
npm install @aws-sdk/client-s3
```

**Get R2 API Tokens:**
1. Go to Cloudflare Dashboard > R2
2. Click "Manage R2 API Tokens"
3. Create a new API token with read/write permissions
4. Copy the Access Key ID and Secret Access Key

**Set Environment Variables:**
```bash
export R2_ACCESS_KEY_ID="your-access-key-id"
export R2_SECRET_ACCESS_KEY="your-secret-access-key"
export R2_ACCOUNT_ID="your-account-id"  # Required - get from Cloudflare Dashboard
export R2_BUCKET_NAME="360-artist-assets"  # Optional, defaults to this
```

**Or use a .env file:**
```bash
cp .env.example .env
# Edit .env with your actual values
# Then source it: source .env
```

**Upload:**
```bash
node upload-to-r2.js
```

### Method 3: Using Cloudflare Dashboard

1. Go to Cloudflare Dashboard > R2
2. Click on your bucket (`360-artist-assets`)
3. Click "Upload"
4. Drag and drop files or select folders
5. Maintain the folder structure:
   - `Course Material PDF/Assets/...`
   - `Course Material PDF/Bookings/...`
   - `Course Material PDF/Branding/...`
   - etc.
   - `downloads/...`

## Files to Upload

### Course Material PDF Directory
- All files in `Course Material PDF/Assets/`
- All PDFs in `Course Material PDF/Bookings/`
- All PDFs in `Course Material PDF/Branding/`
- All PDFs in `Course Material PDF/Finance/`
- All PDFs in `Course Material PDF/Legal/`
- All PDFs in `Course Material PDF/Management/`
- All PDFs in `Course Material PDF/Marketing/`

### Assets Downloads
- All files in `assets/downloads/`

## Verify Upload

After uploading, verify in Cloudflare Dashboard:
1. Go to R2 > `360-artist-assets`
2. Check that files are present with correct paths
3. Test access via your Pages Functions:
   - `/r2/Course Material PDF/Assets/filename.png`
   - `/downloads/filename.pdf`

## Next Steps After Upload

1. Update HTML references in these files:
   - `lessons/finance/02-invoicing.html`
   - `lessons/marketing/06-storytelling.html`
   - `lessons/marketing/07-creating-content.html`
   - `lessons/management/02-artist-cycle.html`
   - `lessons/marketing/04-press-release.html`

2. Change references from:
   ```html
   <img src="../../Course Material PDF/Assets/filename.png">
   ```
   To:
   ```html
   <img src="/r2/Course Material PDF/Assets/filename.png">
   ```

3. Test the deployment

