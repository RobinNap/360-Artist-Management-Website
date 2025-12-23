# Fix: Authentication Error in Deploy Command

## The Problem

Your deployment is failing with:
```
✘ [ERROR] A request to the Cloudflare API failed.
Authentication error [code: 10000]
Please ensure it has the correct permissions for this operation.
```

**Root cause:** The deploy command `npx wrangler pages deploy` requires API token permissions, but for Git-connected Pages projects, you don't need a deploy command at all!

## Solution: Remove the Deploy Command

For Git-connected Pages projects, Cloudflare automatically deploys from your repository. You don't need a deploy command.

### Step 1: Remove Deploy Command

1. **Go to:** Your project → **Settings** tab
2. **Find:** **Build** section
3. **Find:** **Deploy command** field
4. **Delete/clear** the deploy command (make it empty)
5. **Click:** **Save** or **Update**

### Step 2: Let Pages Auto-Deploy

Once you remove the deploy command:
1. **Pages will automatically detect** your static files from Git
2. **No deploy command needed** - Pages handles it automatically
3. **A new deployment will start** automatically after you save

### Step 3: Wait for Deployment

1. **Go to:** **Deployments** tab
2. **Wait 1-3 minutes** for deployment to complete
3. **Look for:** ✅ Green checkmark = Success
4. **Check deployment logs** - should show files being deployed automatically

## Why This Works

For Git-connected Pages projects:
- ✅ **Automatic deployment** from Git (no command needed)
- ✅ **No API token required** for deployment
- ✅ **Simpler setup** - just connect Git and deploy
- ❌ **Deploy commands cause issues** - they require API tokens and permissions

## Alternative: If You Must Keep Deploy Command

If for some reason you need a deploy command, you would need to:
1. Go to Cloudflare Dashboard → Profile → API Tokens
2. Create/edit a token with **Cloudflare Pages:Edit** permissions
3. Add it as an environment variable in your project settings

**But this is NOT recommended** - just remove the deploy command instead!

## Quick Fix Summary

1. Settings → Build → Deploy command
2. **Delete/clear** the deploy command (make it empty)
3. Save
4. Wait for automatic deployment
5. Your site should deploy successfully!

## What You'll See After Fix

The deployment logs should show:
- ✅ Cloning repository
- ✅ Detecting static files
- ✅ Deploying files automatically
- ✅ Success (no authentication errors)

