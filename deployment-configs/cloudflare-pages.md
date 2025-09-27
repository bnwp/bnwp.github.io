# Cloudflare Pages Configuration

Cloudflare Pages doesn't use a configuration file like Netlify or Vercel. Instead, configure these settings in the Cloudflare Pages dashboard:

## Build Settings

- **Framework preset**: Hugo
- **Build command**: `hugo --minify`
- **Build output directory**: `public`
- **Root directory**: `/` (leave empty)

## Environment Variables

Add these in the Cloudflare Pages dashboard under Settings > Environment variables:

```
HUGO_VERSION=0.120.4
HUGO_ENV=production
```

## Build Command for Different Environments

### Production
```bash
hugo --minify --baseURL "https://your-custom-domain.com"
```

### Preview Deployments
```bash
hugo --minify --baseURL $CF_PAGES_URL
```

## Custom Domain Setup

1. In Cloudflare Pages dashboard, go to **Custom domains**
2. Add your domain (e.g., `bnwp.org`)
3. Update your DNS records to point to Cloudflare
4. Enable HTTPS (automatic with Cloudflare)

## Performance Optimizations

Cloudflare Pages automatically provides:
- Global CDN
- HTTP/3 support
- Brotli compression
- Image optimization
- Automatic minification

## Security Headers

Add these in Cloudflare Dashboard under **Security > Transform Rules**:

```
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## Redirect Rules

Create redirect rules in **Rules > Redirect Rules**:

```
Old URL: /old-path/*
New URL: /new-path/$1
Status: 301 (Permanent Redirect)
```

## Analytics

Enable Cloudflare Web Analytics in the dashboard for visitor insights.