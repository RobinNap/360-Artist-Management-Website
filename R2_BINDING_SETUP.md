# R2 Bucket Binding Setup for Cloudflare Pages

## Current Status

✅ Your `wrangler.toml` already has the R2 binding configured:
```toml
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "360-artist-assets"
```

✅ Your `functions/` directory has the R2 functions ready.

## How to Configure R2 Binding in Cloudflare Pages

### Method 1: Via Dashboard (Recommended)

1. **Go to your Pages project:**
   - Navigate to: **Workers & Pages** → **360-artist-management-website**

2. **Open Settings:**
   - Click on the **Settings** tab

3. **Find Functions or Bindings section:**
   - Look for **"Functions"** or **"Bindings"** in the settings
   - If you don't see it, it might appear after your first successful deployment with functions

4. **Add R2 Binding:**
   - Click **"+ Add"** or **"Add binding"**
   - Select **"R2 Bucket"**
   - **Variable name:** `ASSETS` (must match your wrangler.toml)
   - **Bucket:** Select `360-artist-assets`
   - Click **Save**

### Method 2: Via wrangler.toml (Already Done)

Your `wrangler.toml` already has the binding. Cloudflare Pages should automatically pick this up during deployment.

### Method 3: If Functions Section Doesn't Appear

If you don't see a Functions section:

1. **First, make sure you remove the deploy command:**
   - Settings → Build → Edit
   - Remove `npx wrangler deploy` from "Deploy command"
   - Save

2. **Deploy your project:**
   - Push your code to trigger a deployment
   - Cloudflare Pages will detect the `functions/` directory
   - The Functions section should appear after a successful deployment

3. **Then configure the binding:**
   - After deployment, go back to Settings
   - You should now see a "Functions" or "Bindings" section
   - Add the R2 binding there

## Verify the Binding Works

After configuration, test your R2 functions:

1. **Test image access:**
   ```
   https://your-domain.pages.dev/r2/Course Material PDF/Assets/filename.png
   ```

2. **Test download:**
   ```
   https://your-domain.pages.dev/downloads/filename.pdf
   ```

## Troubleshooting

### If functions don't work:

1. **Check the bucket name matches:**
   - Dashboard: R2 → `360-artist-assets`
   - wrangler.toml: `bucket_name = "360-artist-assets"`

2. **Check the binding name matches:**
   - wrangler.toml: `binding = "ASSETS"`
   - functions/r2-assets.ts: `env.ASSETS`
   - functions/r2-downloads.ts: `env.ASSETS`

3. **Verify files are in R2:**
   - Go to R2 → `360-artist-assets`
   - Confirm files are uploaded with correct paths

4. **Check deployment logs:**
   - Go to Deployments tab
   - Check for any errors about bindings

## Important Notes

- The binding name `ASSETS` must match in:
  - `wrangler.toml` (binding name)
  - Your function code (`env.ASSETS`)
  - Dashboard configuration (if you set it there)

- For Cloudflare Pages, the `wrangler.toml` configuration should be sufficient, but dashboard configuration provides a backup and makes it easier to manage.


