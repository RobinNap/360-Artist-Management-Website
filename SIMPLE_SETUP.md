# Simple Setup: Like GitHub Pages

## Goal
Make your site work like a standard GitHub Pages deployment - simple, automatic, no deploy commands needed.

## Step 1: Fix Build Settings in Cloudflare Dashboard

1. **Go to:** Your project → **Settings** tab → **Build** section

2. **Configure these settings:**
   - **Framework preset:** `None` or `Plain HTML`
   - **Build command:** **LEAVE EMPTY** (or `echo "No build needed"`)
   - **Build output directory:** `/` (just a forward slash)
   - **Root directory:** `/` (leave default)
   - **Deploy command:** **LEAVE EMPTY** or use `echo "Deploying from Git"`

3. **Save** the settings

## Step 2: Simplify wrangler.toml (Optional)

The `wrangler.toml` file is optional for simple static sites. You can either:
- **Keep it** (it won't hurt)
- **Remove it** (Cloudflare will auto-detect your files)

If you want to keep it minimal, here's a simple version:

```toml
name = "360-artist-management-website"
compatibility_date = "2024-01-01"
```

That's it! No R2 bindings, no complex config - just the basics.

## Step 3: Let Cloudflare Auto-Deploy

Once you've removed/cleared the deploy command:

1. **Cloudflare will automatically:**
   - Clone your Git repository
   - Detect `index.html` and static files
   - Deploy them automatically
   - No authentication needed
   - No deploy commands needed

2. **Check Deployments tab:**
   - Should show successful deployment
   - Should list your HTML, CSS, JS files
   - Should work without errors

## Step 4: Test Your Site

1. **Wait for deployment** (1-3 minutes)
2. **Check Deployments tab** for success
3. **Click on successful deployment** to get URL
4. **Test the `.pages.dev` URL** - should show your website!

## What You Need

For a simple static site like GitHub Pages:
- ✅ `index.html` in root (you have this)
- ✅ CSS, JS, images in folders (you have this)
- ✅ Git repository connected (you have this)
- ✅ Build command: **EMPTY**
- ✅ Deploy command: **EMPTY** or `echo "..."`

That's it! No API keys, no complex config, just simple static file serving.

## After Setup

Your site will:
- ✅ Auto-deploy on every Git push
- ✅ Work like GitHub Pages
- ✅ No manual deployment needed
- ✅ Simple and reliable

