# Testing Guide for Alternative Hosting Platforms

This guide helps you test the Hugo site on different hosting platforms before migrating from GitHub Pages.

## Pre-Migration Testing Checklist

### 1. Local Testing
Before deploying to any platform, test locally:

```bash
# Test with different baseURL values
hugo server --baseURL http://localhost:1313
hugo server --baseURL https://your-test-domain.netlify.app
hugo server --baseURL https://your-test-domain.vercel.app
```

### 2. Build Verification
Test the build process:

```bash
# Clean build
rm -rf public/
hugo --minify --baseURL "https://your-new-domain.com"

# Verify output
ls -la public/
find public/ -name "*.html" | head -5
```

### 3. Check External Dependencies
Verify all external resources load correctly:

- ✅ Google Fonts (`fonts.googleapis.com`)
- ✅ Bootstrap CDN (`cdn.jsdelivr.net`)
- ✅ Bootstrap Icons (`cdn.jsdelivr.net`)
- ✅ Facebook SDK (`connect.facebook.net`)
- ✅ jQuery CDN (`cdnjs.cloudflare.com`)

## Platform-Specific Testing

### Netlify Testing

1. **Create test deployment**:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy for testing
   netlify deploy --dir=public --prod=false
   ```

2. **Test preview URL** provided by Netlify

3. **Verify build logs** in Netlify dashboard

### Vercel Testing

1. **Create test deployment**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy for testing
   vercel --prod=false
   ```

2. **Test preview URL** provided by Vercel

3. **Check build logs** in Vercel dashboard

### Cloudflare Pages Testing

1. **Connect repository** to Cloudflare Pages
2. **Configure build settings** as per `cloudflare-pages.md`
3. **Test the preview deployment**
4. **Verify performance** metrics

## Critical Test Points

### 1. Navigation Testing
- [ ] Main navigation works
- [ ] Language switching (Bengali ↔ English)
- [ ] Internal links resolve correctly
- [ ] Search functionality works

### 2. Content Verification
- [ ] Homepage loads completely
- [ ] Blog posts display correctly
- [ ] Project pages render properly
- [ ] Profile pages work (persona directory)
- [ ] Contact form functions (if applicable)

### 3. Asset Loading
- [ ] CSS files load (check browser network tab)
- [ ] JavaScript files execute
- [ ] Images display correctly
- [ ] Fonts render properly
- [ ] Icons appear correctly

### 4. Performance Testing
- [ ] Page load times are acceptable
- [ ] Mobile responsiveness works
- [ ] CDN assets load quickly
- [ ] No broken external links

### 5. SEO and Meta Tags
- [ ] Page titles are correct
- [ ] Meta descriptions appear
- [ ] Open Graph tags work
- [ ] Canonical URLs are correct
- [ ] Sitemap.xml is accessible

### 6. Special Features
- [ ] Profile management system works (`/update-data/`)
- [ ] GitHub API integration functions
- [ ] Facebook feed displays
- [ ] Search functionality operates
- [ ] RSS feeds generate correctly

## Testing Commands

### Comprehensive Link Testing
```bash
# Install a link checker
npm install -g broken-link-checker

# Check for broken links (after deployment)
blc https://your-test-site.com -r --filter-level 3
```

### Performance Testing
```bash
# Use Google PageSpeed Insights
# Or install lighthouse CLI
npm install -g lighthouse

lighthouse https://your-test-site.com --output=html --output-path=./performance-report.html
```

### Security Headers Testing
```bash
# Test security headers
curl -I https://your-test-site.com

# Or use online tools:
# - securityheaders.com
# - observatory.mozilla.org
```

## Common Issues and Solutions

### Issue: CSS/JS Not Loading
**Cause**: Incorrect baseURL configuration
**Solution**: Update `config/_default/config.yaml` with correct baseURL

### Issue: Images Not Displaying
**Cause**: Absolute paths or missing static files
**Solution**: Verify image paths in `static/` directory

### Issue: External CDN Issues
**Cause**: Platform blocking external resources
**Solution**: Check Content Security Policy settings

### Issue: Facebook Feed Not Working
**Cause**: HTTPS requirements or CSP restrictions
**Solution**: Ensure HTTPS and proper CSP headers

### Issue: Build Failures
**Cause**: Missing Hugo version or environment variables
**Solution**: Set correct `HUGO_VERSION` environment variable

## Rollback Plan

If testing reveals issues:

1. **Keep GitHub Pages active** during testing
2. **Use subdomain or test domain** for new platform
3. **Document all issues** found during testing
4. **Fix issues** before full migration
5. **Have DNS rollback plan** ready

## Post-Migration Verification

After successful migration:

- [ ] Update all documentation with new URLs
- [ ] Notify team members of the change
- [ ] Monitor error logs for 48 hours
- [ ] Check Google Search Console for crawl errors
- [ ] Verify analytics tracking continues working
- [ ] Update any hardcoded references to old URLs

## Testing Timeline

**Week 1**: Platform setup and initial testing
**Week 2**: Comprehensive testing and issue resolution
**Week 3**: Staging deployment and final verification
**Week 4**: Production migration (if all tests pass)

## Emergency Contacts

During migration testing, ensure you have:
- DNS provider access
- Hosting platform support contacts
- Backup of current working site
- List of all team members to notify