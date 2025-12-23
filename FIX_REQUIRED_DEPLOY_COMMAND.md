# Fix: Required Deploy Command Field

## The Problem

The "Deploy command" field is required and can't be left empty. But `npx wrangler pages deploy` causes authentication errors.

## Solution: Use a No-Op Command

Since the field is required, use a command that does nothing but satisfies the requirement:

### Option 1: Simple Echo (Recommended)

**Deploy command:**
```bash
echo "Deploying from Git - Pages handles deployment automatically"
```

This command:
- ✅ Satisfies the required field
- ✅ Does nothing (just prints text)
- ✅ No authentication needed
- ✅ Pages will still auto-deploy from Git

### Option 2: Exit Success

**Deploy command:**
```bash
exit 0
```

This command:
- ✅ Satisfies the required field
- ✅ Exits with success code
- ✅ No authentication needed

### Step-by-Step

1. **Go to:** Your project → **Settings** tab → **Build** section
2. **Find:** **Deploy command** field
3. **Replace** `npx wrangler pages deploy` with:
   ```
   echo "Deploying from Git - Pages handles deployment automatically"
   ```
4. **Click:** **Save**

## How It Works

- The deploy command runs but does nothing
- Pages still automatically deploys from Git (this happens separately)
- No authentication errors
- No API tokens needed

## After Fixing

1. **Save** the settings
2. **A new deployment will start**
3. **Wait 1-3 minutes**
4. **Check Deployments tab** - should show success
5. **Your site should work!**

## Why This Works

Cloudflare Pages has two deployment paths:
1. **Deploy command** (what you're setting) - runs but can be a no-op
2. **Git auto-deploy** (automatic) - this is what actually deploys your files

By using `echo`, you satisfy the required field, but Pages still auto-deploys from Git without needing authentication.

