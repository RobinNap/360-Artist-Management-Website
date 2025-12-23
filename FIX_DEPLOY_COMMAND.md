# Fix: Deploy Command Error

## The Problem

Your deployment is failing with this error:
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
For Pages, please run `wrangler pages deploy` instead.
```

**Root cause:** The deploy command is set to `npx wrangler deploy` (for Workers), but your project is configured as Pages.

## Solution: Fix the Deploy Command

### Step 1: Go to Project Settings

1. **Go to:** Your project → **Settings** tab
2. **Find:** **Build** section
3. **Look for:** **Deploy command** field

### Step 2: Update the Deploy Command

You have two options:

**Option A: Use Pages Deploy Command (Recommended)**
- Change deploy command to: `npx wrangler pages deploy`
- This will properly deploy your Pages project

**Option B: Remove Deploy Command (Best for Git-connected projects)**
- **Delete or clear** the deploy command field
- Leave it **empty**
- Pages will automatically deploy from Git (no command needed)

### Step 3: Save Changes

1. **Click:** **Save** or **Update** button
2. This should trigger a new deployment automatically

### Step 4: Wait for Deployment

1. **Go to:** **Deployments** tab
2. **Wait 1-3 minutes** for deployment to complete
3. **Look for:** ✅ Green checkmark = Success

### Step 5: Test Your Site

Once deployment succeeds:
1. **Click on the successful deployment**
2. **Find the Production URL** (should be `.pages.dev`)
3. **Test it** - you should see your website!

## Why This Happened

Your project is configured as **Pages** (which is correct for static sites), but the deploy command was set to `npx wrangler deploy` which is for **Workers**. This mismatch caused the deployment to fail.

## Quick Fix Summary

1. Settings → Build → Deploy command
2. Change from: `npx wrangler deploy`
3. Change to: `npx wrangler pages deploy` **OR** leave empty
4. Save
5. Wait for new deployment
6. Test your site!

