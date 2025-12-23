# Custom Domain Setup Troubleshooting

## The Problem

You're seeing "Safari Can't Find the Server" for `360artistmanagement.com`. This means:
- ❌ The domain isn't configured in Cloudflare Pages, OR
- ❌ DNS records aren't set up correctly, OR
- ❌ The domain isn't pointing to your Cloudflare Pages deployment

## Step 1: Verify Your Pages Site is Working

**First, check if your site works on the default Pages URL:**

1. Go to **Cloudflare Dashboard** → **Workers & Pages**
2. Find your **Pages** project: `360-artist-management-website`
3. Click on it
4. Go to the **Deployments** tab
5. Find a successful deployment (green checkmark)
6. Click on it to see the **Production URL** (should be `https://360-artist-management-website.pages.dev`)

**Test this URL in your browser:**
- ✅ If it works → Your site is deployed correctly, proceed to Step 2
- ❌ If it doesn't work → Fix your Pages deployment first (see TROUBLESHOOTING.md)

## Step 2: Add Custom Domain to Cloudflare Pages

### Option A: Domain is Already in Cloudflare

If `360artistmanagement.com` is already added to your Cloudflare account:

1. **Go to your Pages project:**
   - Navigate to: **Workers & Pages** → **360-artist-management-website**

2. **Open Custom Domains:**
   - Click on the **Custom domains** tab (or look in **Settings** → **Custom domains**)

3. **Add your domain:**
   - Click **"Set up a custom domain"** or **"Add custom domain"**
   - Enter: `360artistmanagement.com`
   - Also add: `www.360artistmanagement.com` (optional but recommended)
   - Click **Continue** or **Save**

4. **Cloudflare will automatically:**
   - Create DNS records (CNAME) pointing to your Pages site
   - Set up SSL certificate (automatic, takes a few minutes)
   - Configure the domain

5. **Wait for DNS propagation:**
   - Usually takes 5-15 minutes
   - Check status in the Custom domains tab
   - Status should show "Active" when ready

### Option B: Domain is NOT in Cloudflare

If your domain is registered elsewhere (GoDaddy, Namecheap, etc.):

1. **Add domain to Cloudflare:**
   - Go to **Cloudflare Dashboard** → **Add a Site**
   - Enter: `360artistmanagement.com`
   - Follow the setup wizard
   - Update your domain's nameservers at your registrar (Cloudflare will provide them)

2. **Wait for nameserver propagation:**
   - This can take 24-48 hours (usually much faster)
   - Check when Cloudflare shows "Active" status

3. **Then add to Pages:**
   - Follow **Option A** steps above

## Step 3: Verify DNS Configuration

### ⚠️ IMPORTANT: Worker Record Issue

**If you see a "Worker" type DNS record** (instead of CNAME):
- This might work, but it's not the standard way for Pages
- The domain MUST be added in Pages → Custom domains for it to work
- If it's not working, you may need to delete the Worker record and add the domain properly through Pages

### Check DNS Records in Cloudflare:

1. **Go to:** Cloudflare Dashboard → Select `360artistmanagement.com` → **DNS** → **Records**

2. **You should see:**
   - ✅ `360artistmanagement.com` → **CNAME** → `360-artist-management-website.pages.dev` (or similar)
   - ✅ `www.360artistmanagement.com` → **CNAME** → `360-artist-management-website.pages.dev` (if you added www)

3. **If you see a "Worker" record instead:**
   - **First, check if domain is added in Pages:**
     - Go to **Workers & Pages** → **360-artist-management-website** → **Custom domains** tab
     - Is `360artistmanagement.com` listed there?
     - If NO → Add it (see Step 2)
     - If YES → Check the status (should be "Active")
   
   - **If domain is in Pages but still not working:**
     - The Worker record might be interfering
     - Try deleting the Worker record
     - Then re-add the domain in Pages → Custom domains
     - Cloudflare will create the correct CNAME automatically

4. **If records are missing:**
   - Go back to Pages → Custom domains
   - Re-add the domain (Cloudflare should create them automatically)

### Check DNS Propagation:

Use these tools to verify DNS is working:
- https://dnschecker.org/#CNAME/360artistmanagement.com
- https://www.whatsmydns.net/#CNAME/360artistmanagement.com

**Look for:** Records pointing to `*.pages.dev` or `*.pages.cloudflare.com`

## Step 4: Check SSL Certificate

1. **Go to:** Pages project → **Custom domains** tab
2. **Check SSL status:**
   - ✅ **Active** = Certificate is ready
   - ⏳ **Pending** = Still being issued (wait 5-15 minutes)
   - ❌ **Error** = Click to see details

3. **If SSL is pending:**
   - Wait a few minutes
   - Refresh the page
   - SSL certificates are issued automatically

## Step 5: Common Issues & Solutions

### Issue: "Domain not found" or "Can't find server"

**Possible causes:**
1. Domain not added to Pages project
   - **Solution:** Add it in Pages → Custom domains
   - **Check:** Workers & Pages → Your Pages project → Custom domains tab
2. DNS records not created or wrong type
   - **Solution:** Re-add domain in Pages → Custom domains (this creates correct CNAME)
   - **If you have a Worker record:** Delete it and add domain through Pages instead
3. DNS not propagated yet
   - **Solution:** Wait 15-30 minutes, check with dnschecker.org
4. Nameservers not updated
   - **Solution:** Update nameservers at your domain registrar
5. Worker record instead of CNAME
   - **Solution:** Delete Worker record, add domain through Pages → Custom domains

### Issue: "SSL certificate error"

**Solution:**
- Wait 5-15 minutes for automatic SSL issuance
- Check Custom domains tab for SSL status
- If stuck, remove and re-add the domain

### Issue: "Site works on .pages.dev but not custom domain"

**Solution:**
- Verify custom domain is added in Pages project
- Check DNS records are correct
- Wait for DNS propagation
- Clear browser cache

### Issue: "Domain shows different site or old content"

**Solution:**
- Check you're using the correct Pages project
- Verify DNS records point to the right project
- Wait for cache to clear (can take a few hours)

## Step 6: Quick Checklist

- [ ] My site works on `360-artist-management-website.pages.dev`
- [ ] I've added `360artistmanagement.com` in Pages → Custom domains tab
- [ ] Custom domain shows "Active" status in Pages
- [ ] DNS records exist in Cloudflare DNS (should be CNAME, not Worker)
- [ ] DNS record points to `*.pages.dev` or `*.pages.cloudflare.com`
- [ ] SSL certificate shows "Active" status
- [ ] I've waited at least 15 minutes after adding domain
- [ ] DNS propagation shows correct records (checked with dnschecker.org)

## Still Not Working?

### Debug Steps:

1. **Check Pages deployment:**
   ```
   https://360-artist-management-website.pages.dev
   ```
   Does this work? If not, fix deployment first.

2. **Check DNS records:**
   - Cloudflare Dashboard → DNS → Records
   - Should see CNAME pointing to Pages

3. **Check Custom domains status:**
   - Pages project → Custom domains tab
   - Should show "Active" status

4. **Test with different tools:**
   - `curl -I https://360artistmanagement.com` (in terminal)
   - Check browser developer tools → Network tab
   - Try incognito/private browsing mode

5. **Contact Cloudflare Support:**
   - If everything looks correct but still not working
   - Provide screenshots of:
     - Custom domains tab
     - DNS records
     - Deployment status

## Expected Timeline

- **Adding domain to Pages:** Instant
- **DNS record creation:** Instant (automatic)
- **DNS propagation:** 5-30 minutes (usually)
- **SSL certificate:** 5-15 minutes (automatic)
- **Full setup:** Usually 15-30 minutes total

