# Use Echo Command for Deploy

## The Problem

The deploy command is trying to run `wrangler` which isn't available, causing:
```
/bin/sh: 1: wrangler: not found
```

## Solution: Use Echo Command

Since the deploy command field is required, use a simple `echo` command that does nothing:

### Exact Command to Use

**In Settings → Build → Deploy command, enter:**

```bash
echo "Deploying from Git - Pages handles deployment automatically"
```

**OR simply:**

```bash
echo "Deploying"
```

### Why This Works

- ✅ No dependencies needed (echo is built into shell)
- ✅ No authentication needed
- ✅ Satisfies the required field
- ✅ Pages still auto-deploys from Git

### Step-by-Step

1. **Go to:** Settings → Build
2. **Find:** Deploy command field
3. **Replace everything** with:
   ```
   echo "Deploying from Git - Pages handles deployment automatically"
   ```
4. **Save**

## Important

Make sure you're using `echo`, NOT `wrangler` or `npx wrangler`.

The command should be:
- ✅ `echo "Deploying"`
- ❌ `wrangler pages deploy`
- ❌ `npx wrangler pages deploy`

