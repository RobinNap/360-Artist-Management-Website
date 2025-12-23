# Fix Deploy Command - It Changed Back

## The Problem

The deploy command changed back to `npx wrangler deploy` (for Workers), but your project is Pages. The error confirms:
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
```

## Solution: Change Back to Echo Command

### Step 1: Update Deploy Command

1. **Go to:** Your project → **Settings** tab → **Build** section
2. **Find:** **Deploy command** field
3. **Replace** `npx wrangler deploy` with:
   ```
   echo "Deploying from Git - Pages handles deployment automatically"
   ```
4. **Click:** **Save**

### Step 2: Verify It Saved

After saving, check that the deploy command shows:
```
echo "Deploying from Git - Pages handles deployment automatically"
```

NOT:
- ❌ `npx wrangler deploy`
- ❌ `npx wrangler pages deploy`
- ❌ `wrangler pages deploy`

## Why It Might Have Changed

- You might have clicked "Edit code" which changed settings
- Or Cloudflare might have auto-detected something
- Make sure to save the echo command

## After Fixing

1. **Save** the settings
2. **A new deployment will start automatically**
3. **Wait 1-3 minutes**
4. **Check Deployments tab** - should show success
5. **Your site should work!**

## Important

Make sure the deploy command is:
```
echo "Deploying from Git - Pages handles deployment automatically"
```

This is the only command that works without authentication errors.

