# Deployment Configuration Files

This directory contains sample configuration files for deploying the Hugo site to various hosting platforms.

## Files Included

### `netlify.toml`
Configuration file for Netlify deployment. Place this file in the repository root.

### `vercel.json`
Configuration file for Vercel deployment. Place this file in the repository root.

### `package.json`
Sample package.json for platforms that require it (like Vercel). Place this file in the repository root.

### `cloudflare-pages.md`
Instructions for configuring Cloudflare Pages (no config file needed).

## Usage Instructions

1. **Choose your hosting platform** from the recommended alternatives in `GOOGLE_DRIVE_HOSTING.md`

2. **Copy the appropriate configuration files** to your repository root:
   - For Netlify: Copy `netlify.toml`
   - For Vercel: Copy `vercel.json` and `package.json`
   - For Cloudflare Pages: Follow instructions in `cloudflare-pages.md`

3. **Update baseURL** in `config/_default/config.yaml` to match your new hosting platform URL

4. **Update DNS records** to point to your new hosting platform

5. **Test the deployment** before switching from the current GitHub Pages setup

## Important Notes

- These are sample configurations that may need adjustment based on your specific requirements
- Always test configurations in a staging environment before deploying to production
- Remember to update any hardcoded URLs in your content or templates
- Consider the impact on SEO when changing hosting platforms

## Platform-Specific Considerations

### Netlify
- Excellent build performance
- Built-in form handling
- Serverless functions support
- Easy custom redirects

### Vercel
- Outstanding performance
- Automatic preview deployments
- Great developer experience
- Advanced caching strategies

### Cloudflare Pages
- Global CDN with excellent performance
- Advanced security features
- No configuration file needed
- Free SSL and DDoS protection

## Migration Checklist

- [ ] Choose hosting platform
- [ ] Copy appropriate config files
- [ ] Update baseURL in Hugo config
- [ ] Test build locally
- [ ] Deploy to new platform
- [ ] Verify all pages load correctly
- [ ] Check external resources (CDNs, fonts, etc.)
- [ ] Update DNS records
- [ ] Monitor for any issues
- [ ] Update documentation with new URLs