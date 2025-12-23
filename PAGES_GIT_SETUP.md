# Cloudflare Pages Git Integration Setup

## The Right Way: Deploy from GitHub

Cloudflare Pages should **automatically deploy from your GitHub repository**, not use a deploy command.

## Setup Steps

### 1. Create/Configure Pages Project

1. Go to **Cloudflare Dashboard** → **Workers & Pages**
2. Click **Create application** → **Pages** → **Connect to Git**
3. Select **GitHub** and authorize Cloudflare
4. Choose your repository: `RobinNap/360-Artist-Management-Website`
5. Click **Begin setup**

### 2. Configure Build Settings

**Project name:** `360-artist-management-website`

**Build settings:**
- **Framework preset:** None (or "Plain HTML")
- **Build command:** Leave **EMPTY** (or use `echo "No build needed"`)
- **Build output directory:** `/` (root)
- **Root directory:** `/` (leave default)

**Environment variables:** None needed

### 3. Deploy Command (If Required)

If the deploy command field is **required** (which seems to be the case), use:

```bash
echo "Deploying from Git - Pages handles deployment automatically"
```

**DO NOT use:**
- ❌ `npx wrangler deploy` (for Workers)
- ❌ `npx wrangler pages deploy` (causes auth issues)

### 4. Save and Deploy

1. Click **Save and Deploy**
2. Cloudflare will:
   - Clone your repository
   - Detect your static files
   - Deploy them automatically
   - Create a Pages URL (e.g., `360-artist-management-website.pages.dev`)

## How It Works

1. **Automatic Deployment:**
   - Every push to your `main` branch triggers a new deployment
   - No manual deploy commands needed
   - Cloudflare handles everything

2. **What Gets Deployed:**
   - All files in your repository root
   - Your `functions/` directory (detected automatically)
   - Your `wrangler.toml` (read for configuration)
   - Your `_headers` and `_redirects` files

3. **R2 Binding:**
   - The `wrangler.toml` configuration will be picked up automatically
   - Your `functions/r2-assets.ts` and `functions/r2-downloads.ts` will work
   - The R2 binding `R2_ASSETS` will be configured from `wrangler.toml`

## Verify Setup

After setup, you should see:

1. **Deployments tab:** Shows deployment history from Git commits
2. **Pages URL:** Something like `360-artist-management-website.pages.dev`
3. **Automatic builds:** New deployments trigger on every Git push

## Troubleshooting

### If you see "hello world":
- You're looking at a **Worker** project, not **Pages**
- Find the **Pages** project (separate from Workers)
- Access the `.pages.dev` URL, not `.workers.dev`

### If deployment fails:
- Check the **Deployments** tab for error logs
- Verify your repository is connected
- Make sure `wrangler.toml` has `pages_build_output_dir = "./"`

### If R2 functions don't work:
- Check that `wrangler.toml` has the R2 binding configured
- Verify the binding name is `R2_ASSETS` (not `ASSETS` - reserved)
- Check that files are uploaded to R2 bucket `360-artist-assets`

## Next Steps

1. **Create the Pages project** connected to GitHub (if not already done)
2. **Remove or simplify the deploy command** (use the echo command above)
3. **Push your code** to trigger automatic deployment
4. **Access your site** via the Pages URL (`.pages.dev`)

