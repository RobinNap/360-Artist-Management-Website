# Check What's Being Deployed

## The Problem

You're seeing "Hello world" again, which means static files aren't being served.

## What to Check

### Step 1: Check Deployment Logs

1. **Go to:** Deployments tab
2. **Click on the latest deployment**
3. **Look at the logs** - what do they show?
   - Does it mention deploying files?
   - Does it list HTML, CSS, JS files?
   - Or does it only show the echo command?

### Step 2: Check Build Output Directory

1. **Go to:** Settings → Build
2. **Check:** Build output directory
   - What is it set to?
   - Should be `/` or `./` (root directory)

### Step 3: Check if There's a Worker Script

1. **Go to:** Settings tab
2. **Look for:** "Edit code" button or "Worker code" section
3. **Is there Worker code?** If yes, that might be overriding static files

### Step 4: Check Project Type

1. **In Workers & Pages list**, what does your project show?
   - Does it say "Worker" or "Pages"?
   - What URL does it show? (`.workers.dev` or `.pages.dev`?)

## Most Likely Issues

1. **Build output directory is wrong** - not pointing to root
2. **Worker script exists** - overriding static file serving
3. **Project is still configured as Worker** - not Pages

## What to Share

Please check and share:
1. What does the latest deployment log show? (any file listings?)
2. What is the Build output directory set to?
3. Is there an "Edit code" button in Settings?
4. What URL are you testing? (`.workers.dev` or `.pages.dev`?)

