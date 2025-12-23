# Security Guidelines

## Sensitive Information

This repository is public. **Never commit sensitive information** to Git.

## What Should NOT Be Committed

### ❌ Never Commit:
- API keys, tokens, or secrets
- Account IDs (Cloudflare, AWS, etc.)
- Passwords or credentials
- `.env` files with actual values
- Private keys or certificates
- Access tokens
- Database credentials

### ✅ Safe to Commit:
- Configuration templates (`.env.example`)
- Public project structure
- Code without hardcoded secrets
- Documentation (without credentials)

## Protected Files

The following are automatically excluded via `.gitignore`:
- `.env` and `.env.*` files
- `*credentials*` files
- `*secrets*` files
- `*.key`, `*.pem`, `*.p12`, `*.pfx` files
- Upload scripts (review before committing)

## Environment Variables

Use environment variables for sensitive data:

1. **Create `.env` file** (already in `.gitignore`):
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

2. **Never commit `.env`** - it's already excluded

3. **Use `.env.example`** as a template (safe to commit)

## Upload Scripts

The upload scripts (`upload-to-r2.sh`, `upload-to-r2.js`) now require environment variables:
- `R2_ACCOUNT_ID` - Your Cloudflare Account ID
- `R2_ACCESS_KEY_ID` - R2 API Access Key
- `R2_SECRET_ACCESS_KEY` - R2 API Secret Key
- `R2_BUCKET_NAME` - Bucket name (optional, has default)

**Before committing upload scripts:**
- Verify no hardcoded credentials
- Ensure they use environment variables
- Test that they fail gracefully without credentials

## Cloudflare Configuration

- Account IDs and bucket names in `wrangler.toml` are **not secrets** but should be reviewed
- R2 bucket bindings are configured in Cloudflare Dashboard, not in code
- API tokens are stored in Cloudflare Dashboard, never in code

## If You Accidentally Commit Secrets

1. **Immediately rotate/revoke** the exposed credentials
2. **Remove from Git history** (if possible):
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch path/to/file" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push** (⚠️ coordinate with team)
4. **Update documentation** to prevent future issues

## Best Practices

1. ✅ Always use environment variables for secrets
2. ✅ Review files before committing (`git diff`)
3. ✅ Use `.env.example` as a template
4. ✅ Never hardcode credentials
5. ✅ Regularly audit committed files for secrets
6. ✅ Use tools like `git-secrets` to prevent accidental commits


