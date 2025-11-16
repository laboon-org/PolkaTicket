# 🚀 Vercel Deployment Guide - Polka Ticket

## ✅ Prerequisites
- ✅ vercel.json configured
- ✅ Production build ready
- ✅ All bugs fixed

## 📦 Install Vercel CLI (if needed)
```bash
npm install -g vercel
```

## 🚀 Deploy Commands

### Option 1: Quick Deploy (Recommended)
```bash
cd /Volumes/Extended\ HD/Work_Extended/opp_2025/devpost/hackathon/master_devpost/projects/010-poka-ticket/3_dev/front

# Login (first time only)
vercel login

# Deploy to production
vercel --prod
```

### Option 2: Step by Step
```bash
# 1. Build
npm run build

# 2. Deploy
vercel deploy --prod

# Or just:
vercel --prod
```

## 🎯 During Deployment

Vercel will ask:
1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your account
3. **Link to existing project?** → No (first time) / Yes (subsequent)
4. **Project name?** → polka-ticket
5. **Directory?** → ./ (current directory)
6. **Override settings?** → No

## 🌐 Expected URLs

**Production:**
- https://polka-ticket.vercel.app
- Or custom: https://polka-ticket-[hash].vercel.app

**Preview (for testing):**
```bash
vercel
# Creates preview URL: https://polka-ticket-[hash]-[user].vercel.app
```

## 📋 Post-Deployment

### 1. Verify Deployment
```bash
# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]
```

### 2. Test Live Site
- [ ] Homepage loads
- [ ] Events display
- [ ] Wallet connection works
- [ ] Navigation functional
- [ ] No console errors

### 3. Custom Domain (Optional)
```bash
# Add custom domain
vercel domains add polka-ticket.com

# Or use Vercel's domain
# Already have: polka-ticket.vercel.app
```

## 🎯 Submit to Polkadot Cloud

After Vercel deployment:

1. **Copy live URL:** https://polka-ticket.vercel.app
2. **Submit form:** https://polkadot.cloud/apps/submit-application
3. **Fill in:**
   - App name: Polka Ticket
   - App link: https://polka-ticket.vercel.app
   - Your name: [Your Name]
   - Your email: [Your Email]
   - How did you hear: Polkadot Devpost Hackathon 2025

## 🔧 Troubleshooting

### Build fails on Vercel
```bash
# Check build locally first
npm run build

# If successful, redeploy
vercel --prod --force
```

### Routes return 404
Already configured in `vercel.json`:
```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### Environment variables missing
Add in Vercel dashboard:
1. Go to: https://vercel.com/[your-username]/polka-ticket/settings/environment-variables
2. Add variables from `.env.production`

## 📊 Vercel Features

**Automatic:**
- ✅ HTTPS/SSL
- ✅ CDN distribution
- ✅ Automatic builds
- ✅ Preview deployments
- ✅ Analytics

**Performance:**
- Edge Network
- Automatic compression
- Image optimization
- Fast global delivery

## 🎬 Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# Check deployments
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]

# Open in browser
vercel --prod --open
```

## ✅ Deployment Checklist

- [ ] Vercel CLI installed
- [ ] Logged in: `vercel login`
- [ ] Build successful: `npm run build`
- [ ] Deploy: `vercel --prod`
- [ ] Copy production URL
- [ ] Test live site
- [ ] Submit to Polkadot Cloud
- [ ] Update README.md
- [ ] Update Devpost submission

## 🌟 Advantages of Vercel

1. **Fast:** Deploy in seconds
2. **Automatic:** Git integration available
3. **Preview:** Every push gets preview URL
4. **Analytics:** Built-in performance metrics
5. **Free:** Generous free tier

## 📞 Support

**Vercel:**
- Docs: https://vercel.com/docs
- Dashboard: https://vercel.com/dashboard

**Polka Ticket:**
- GitHub: https://github.com/hieple7985/polka-ticket
- Issues: Report any deployment issues

---

**Ready to deploy!** 🚀

Run: `vercel --prod`
