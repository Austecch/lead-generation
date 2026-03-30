# Emily Experience - Deployment Guide

## Quick Start

### Option 1: Deploy to VPS (Recommended)

```bash
# 1. Clone repository
git clone https://github.com/yourusername/emily-experience.git
cd emily-experience

# 2. Run deployment script
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Run migrations
docker-compose exec app php artisan migrate --force

# Create admin user
docker-compose exec app php artisan tinker
# \App\Models\User::create(['name' => 'Admin', 'email' => 'admin@emily.com', 'password' => bcrypt('password'), 'role' => 'admin']);
```

### Option 3: GitHub Actions Auto-Deploy

1. Add these secrets to your GitHub repository:
   - `SSH_PRIVATE_KEY`: Your server private key
   - `SSH_USER`: Server username
   - `SSH_HOST`: Server IP or domain

2. Push to `main` branch - deployment happens automatically!

## Server Requirements

- PHP 8.2+
- MySQL 8.0+
- Redis (optional but recommended)
- Composer
- Nginx (or Apache)
- Node.js 18+ (for asset building)

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
APP_NAME="Emily Experience"
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=https://emilyexperience.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=emily_experience
DB_USERNAME=emily_user
DB_PASSWORD=secure_password

REDIS_HOST=127.0.0.1

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...

PAYSTACK_SECRET_KEY=sk_...
FLUTTERWAVE_SECRET_KEY=FLWSECK_...
```

## Post-Deployment

1. **Create admin user:**
```bash
php artisan tinker
\App\Models\User::create(['name' => 'Admin', 'email' => 'admin@emily.com', 'password' => bcrypt('password'), 'role' => 'admin']);
```

2. **Configure cron for scheduled tasks:**
```bash
* * * * * cd /var/www/emily-experience && php artisan schedule:run >> /dev/null 2>&1
```

3. **Setup queue worker (if using queues):**
```bash
php artisan queue:work --daemon
```

## Troubleshooting

### Permission Issues
```bash
sudo chown -R www-data:www-data /var/www/emily-experience
sudo chmod -R 755 /var/www/emily-experience/storage
sudo chmod -R 755 /var/www/emily-experience/bootstrap/cache
```

### Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear
```

### Database Issues
```bash
# Reset migrations
php artisan migrate:fresh --seed

# Backup database
mysqldump -u root -p emily_experience > backup.sql

# Restore database
mysql -u root -p emily_experience < backup.sql
```

## Monitoring

- **Health Check:** https://emilyexperience.com/up
- **Logs:** `tail -f /var/log/emily-deploy.log`
- **Queue Status:** `php artisan queue:monitor`

## Support

For issues, contact: support@emilyexperience.com
