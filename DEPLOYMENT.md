
# Deployment Guide

DashLib AI is a static-first application and can be deployed to any modern web host.

## 1. Vercel (Recommended)
- Push to GitHub.
- Import project.
- Add Environment Variable: `API_KEY`.
- Vercel automatically handles the SPA routing and HTTPS.

## 2. Netlify
- Build Command: (Not required for this static structure, or `npm run build` if using a bundler).
- Publish Directory: `.`.
- Add `_redirects` file for SPA support: `/* /index.html 200`.

## 3. Cloudflare Pages
- Connect GitHub repository.
- Framework Preset: `None`.
- Environment Variable: `API_KEY`.

## 4. Firebase Hosting
- Run `firebase init hosting`.
- Set public directory to `.`.
- Configure as a single-page app.
