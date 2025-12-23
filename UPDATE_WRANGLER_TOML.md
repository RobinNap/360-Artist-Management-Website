# Update wrangler.toml for Pages

## What I Changed

Updated `wrangler.toml` to be explicitly configured for Pages (not Workers).

## Next Steps

1. **Commit and push the updated `wrangler.toml` to GitHub:**
   ```bash
   git add wrangler.toml
   git commit -m "Update wrangler.toml for Pages configuration"
   git push
   ```

2. **In Cloudflare Dashboard:**
   - Go to Settings → Build
   - Make sure deploy command is: `echo "Deploying from Git - Pages handles deployment automatically"`
   - Save

3. **Wait for deployment:**
   - Cloudflare will detect the updated `wrangler.toml`
   - New deployment should start automatically
   - Should deploy your static files correctly

## What the Updated wrangler.toml Does

- ✅ Explicitly configured for Pages
- ✅ Points to root directory (`./`) for static files
- ✅ No Worker-specific settings
- ✅ Should prevent deploy command from reverting

## After Pushing

The deployment should:
- ✅ Use the correct Pages configuration
- ✅ Serve static files from root
- ✅ Not try to run Worker commands
- ✅ Work like GitHub Pages

