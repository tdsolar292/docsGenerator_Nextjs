# Deployment Guide

This guide covers deploying your PV Solar Documentation System to various platforms.

## Pre-Deployment Checklist

- [ ] Update `config/config.js` with production values
- [ ] Set up Gmail App Password for email functionality
- [ ] Test all features locally
- [ ] Add company logo to `public/logo.png` (optional)
- [ ] Update company information in config

## Vercel Deployment (Recommended)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy
```bash
# From your project directory
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: Select your account
# - Link to existing project: N
# - Project name: pv-solar-docs (or your preferred name)
# - Directory: ./ (current directory)
```

### 3. Environment Variables
In Vercel dashboard, add environment variables:
- `ADMIN_EMAIL`: Your admin email
- `ADMIN_EMAIL_PASSWORD`: Gmail App Password

### 4. Custom Domain (Optional)
- Go to Vercel project settings
- Add your custom domain
- Configure DNS records as instructed

## Netlify Deployment

### 1. Build Settings
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Deploy
- Connect your Git repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `.next`

### 3. Environment Variables
Add in Netlify dashboard:
- `ADMIN_EMAIL`
- `ADMIN_EMAIL_PASSWORD`

## Railway Deployment

### 1. Create Railway Project
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 2. Environment Variables
```bash
railway variables:set ADMIN_EMAIL=tdsolar292@gmail.com
railway variables:set ADMIN_EMAIL_PASSWORD=your-app-password
```

## DigitalOcean App Platform

### 1. Create App
- Go to DigitalOcean App Platform
- Create new app from GitHub repository

### 2. Configure Build
- Build command: `npm run build`
- Run command: `npm start`

### 3. Environment Variables
Add in app settings:
- `ADMIN_EMAIL`
- `ADMIN_EMAIL_PASSWORD`

## Self-Hosted Deployment

### 1. Server Setup (Ubuntu/Debian)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

### 2. Deploy Application
```bash
# Clone your repository
git clone <your-repo-url>
cd pv-solar-docs

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "pv-solar-docs" -- start
pm2 save
pm2 startup
```

### 3. Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `ADMIN_EMAIL` | Admin email address | `tdsolar292@gmail.com` |
| `ADMIN_EMAIL_PASSWORD` | Gmail App Password | `abcd efgh ijkl mnop` |
| `COMPANY_NAME` | Your company name | `TD Solar Solutions` |
| `COMPANY_ADDRESS` | Company address | `123 Solar St, City` |
| `COMPANY_PHONE` | Contact phone | `+1-555-123-4567` |
| `COMPANY_EMAIL` | Company email | `info@tdsolar.com` |

## SSL Certificate Setup

### Vercel/Netlify
- Automatic SSL certificates provided

### Self-Hosted with Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Performance Optimization

### 1. Enable Gzip Compression
Add to `next.config.js`:
```javascript
module.exports = {
  compress: true,
  // ... other config
}
```

### 2. Image Optimization
- Add company logo as optimized PNG/WebP
- Use Next.js Image component for better performance

### 3. Caching
```javascript
// In next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ]
  },
}
```

## Monitoring and Maintenance

### 1. Health Checks
Create `pages/api/health.js`:
```javascript
export default function handler(req, res) {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
}
```

### 2. Error Logging
- Set up error tracking (Sentry, LogRocket)
- Monitor email delivery rates
- Check PDF generation success rates

### 3. Backup
- Regular database backups (if using database)
- Code repository backups
- Configuration file backups

## Security Considerations

### 1. Environment Variables
- Never commit credentials to repository
- Use different credentials for production
- Rotate passwords regularly

### 2. HTTPS Only
- Force HTTPS in production
- Set secure headers

### 3. Rate Limiting
Add rate limiting for API routes:
```javascript
// middleware.js
export function middleware(request) {
  // Implement rate limiting logic
}
```

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check Gmail App Password
   - Verify 2FA is enabled
   - Test SMTP connection

2. **PDF generation fails**
   - Check memory limits
   - Verify jsPDF dependencies
   - Test with simple content first

3. **Build failures**
   - Check Node.js version
   - Clear node_modules and reinstall
   - Verify all dependencies

### Debugging
```bash
# Check logs
vercel logs          # For Vercel
netlify logs         # For Netlify
pm2 logs pv-solar-docs  # For self-hosted
```

## Support

For deployment issues:
1. Check platform-specific documentation
2. Verify all environment variables are set
3. Test locally first
4. Check application logs for errors