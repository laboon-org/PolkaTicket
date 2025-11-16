# 🚀 Deploy Instructions - Polka Ticket to Polkadot Cloud

## ✅ Prerequisites Complete

- ✅ Production build ready (`build/` directory)
- ✅ `netlify.toml` configured
- ✅ `.env.production` configured
- ✅ Netlify CLI installed globally
- ✅ All dependencies resolved

---

## 🎯 Deployment Steps

### Step 1: Login to Netlify

```bash
cd /Volumes/Extended\ HD/Work_Extended/opp_2025/devpost/hackathon/master_devpost/projects/010-poka-ticket/3_dev/front
netlify login
```

This will open browser for authentication.

### Step 2: Initialize Netlify Site

```bash
netlify init
```

**Configuration:**
- **Team:** Select your team or create new
- **Site name:** `polka-ticket` (or auto-generated)
- **Build command:** `npm run build`
- **Publish directory:** `build`
- **Deploy:** Yes

### Step 3: Deploy to Production

```bash
netlify deploy --prod
```

Or use one command:

```bash
netlify deploy --prod --dir=build --site=polka-ticket
```

### Step 4: Custom Domain (Optional)

To use `polka-ticket.polkadot.cloud`:

```bash
netlify domains:add polka-ticket.polkadot.cloud
```

**Note:** You need DNS access to `polkadot.cloud` domain. If not available, use Netlify's default domain: `polka-ticket.netlify.app`

---

## 🔧 Alternative: Manual Deploy via Netlify Dashboard

### Option 1: Drag & Drop

1. Go to: https://app.netlify.com/drop
2. Drag `build/` folder
3. Site deployed instantly!

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to: https://app.netlify.com/
3. Click "Add new site" → "Import from Git"
4. Select repository
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - **Base directory:** `3_dev/front`
6. Click "Deploy"

---

## 📝 Environment Variables (Netlify Dashboard)

If deploying via dashboard, add these environment variables:

```
NODE_VERSION=18
NPM_FLAGS=--legacy-peer-deps
REACT_APP_NAME=Polka Ticket
REACT_APP_VERSION=1.1.0-stable
REACT_APP_USE_MOCK_DATA=true
REACT_APP_ENABLE_WALLET=true
REACT_APP_ENABLE_NFT=true
REACT_APP_ENABLE_XCM=true
REACT_APP_ENABLE_PRIVACY=true
REACT_APP_ENABLE_GOVERNANCE=true
```

---

## 🎬 Quick Deploy (Recommended)

**Fastest method - Manual drag & drop:**

```bash
# 1. Ensure build is ready
cd /Volumes/Extended\ HD/Work_Extended/opp_2025/devpost/hackathon/master_devpost/projects/010-poka-ticket/3_dev/front
ls -lh build/

# 2. Open Netlify Drop
open https://app.netlify.com/drop

# 3. Drag the 'build' folder to browser
# Done! Site live in 30 seconds!
```

---

## 🌐 Expected URLs

After deployment, your site will be available at:

**Netlify Default:**
- https://polka-ticket.netlify.app

**Custom Domain (if configured):**
- https://polka-ticket.polkadot.cloud

---

## ✅ Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Homepage shows events
- [ ] Wallet connection works
- [ ] All pages accessible
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Update README.md with live URL
- [ ] Test on different browsers
- [ ] Share link in hackathon submission

---

## 🐛 Troubleshooting

### Build fails on Netlify

**Solution:**
```bash
# Add to netlify.toml
[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"
```

### Routes return 404

**Solution:** Already configured in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment variables not working

**Solution:** Add `REACT_APP_` prefix to all variables.

---

## 📊 Deployment Status

**Current State:**
- ✅ Build: Complete (production bundle ready)
- ✅ Config: netlify.toml created
- ✅ Env: .env.production created
- ⏳ Deploy: Ready to deploy
- ⏳ Live URL: Pending deployment

**Next Action:**
Run one of the deployment methods above to go live!

---

## 🎯 For Hackathon Submission

Once deployed, update these files:

### README.md
```markdown
## 🌐 Live Demo

**Live Site:** https://polka-ticket.netlify.app

Try it now! Connect your Polkadot.js wallet and explore the features.
```

### Devpost Submission
- **Demo URL:** https://polka-ticket.netlify.app
- **GitHub:** https://github.com/yourusername/polka-ticket
- **Video:** [Upload demo video]

---

**Ready to deploy!** Choose your preferred method above. 🚀
