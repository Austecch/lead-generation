---
name: emily-deploy
description: Generate deployment configurations, CI/CD workflows, and server setup scripts for the Emily Experience platform. Includes Laravel deployment, Nginx configuration, and environment setup.
---

# Emily Experience Deployment Skill

Generate deployment configurations for hosting the Emily Experience platform.

## Deployment Architecture

### Phase 1: cPanel Shared Hosting (Recommended for MVP)

**Requirements:**
- PHP 8.1+
- MySQL 8.0+
- Composer
- Node.js 18+ (for build step)

### Phase 2: VPS/Cloud (AWS, DigitalOcean, Linode)

**Stack:**
- Ubuntu 22.04 LTS
- Nginx
- PHP 8.2-FPM
- MySQL 8.0
- Redis (optional)
- Supervisor (for queues)

## Deployment Checklist

### Pre-Deployment

- [ ] Environment variables configured
- [ ] Database credentials secured
- [ ] APP_KEY generated
- [ ] Storage directories writable
- [ ] Cache/Session driver configured
- [ ] Mail provider configured
- [ ] Payment gateway keys added
- [ ] Error tracking (Sentry) configured

### Deployment Steps

1. **Prepare Build**
   - Install PHP dependencies
   - Optimize autoloader
   - Cache config/routes/views

2. **Database**
   - Run migrations
   - Seed if needed
   - Backup existing data

3. **Assets**
   - Build frontend assets
   - Upload to CDN if applicable

4. **Server**
   - Deploy code
   - Set permissions
   - Restart services

5. **Post-Deploy**
   - Clear caches
   - Warm caches
   - Health check

## cPanel Deployment

### .htaccess Configuration

```apache
# public/.htaccess

<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>

# PHP Settings
<IfModule mod_php.c>
    php_value upload_max_filesize 64M
    php_value post_max_size 64M
    php_value memory_limit 256M
    php_value max_execution_time 300
</IfModule>

# Disable Directory Listing
Options -Indexes

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options nosniff
    Header set X-Frame-Options DENY
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

### Deploy Script (cPanel)

```bash
#!/bin/bash
# deploy-cpanel.sh

echo "🚀 Starting Emily Experience deployment..."

# Configuration
REMOTE_USER="youruser"
REMOTE_HOST="yourserver.com"
REMOTE_PATH="/home/youruser/public_html"
BRANCH="main"

echo "📦 Step 1: Preparing local build..."

# Install dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# Generate optimized files
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Build assets (if using a build step)
# npm ci --production
# npm run build

echo "📤 Step 2: Deploying to server..."

# Exclude files not needed on server
rsync -avz --delete \
    --exclude='.git' \
    --exclude='.env' \
    --exclude='node_modules' \
    --exclude='tests' \
    --exclude='.gitignore' \
    --exclude='phpunit.xml' \
    --exclude='README.md' \
    --exclude='deploy*.sh' \
    ./ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

echo "🔧 Step 3: Running remote commands..."

ssh $REMOTE_USER@$REMOTE_HOST "
    cd $REMOTE_PATH

    # Set correct permissions
    chmod -R 755 storage bootstrap/cache

    # Run migrations
    php artisan migrate --force

    # Clear and warm caches
    php artisan optimize:clear
    php artisan optimize

    echo '✅ Deployment complete!'
"

echo "🎉 Deployment finished successfully!"
```

## VPS Deployment (Ubuntu + Nginx)

### Server Setup Script

```bash
#!/bin/bash
# server-setup.sh

# Update system
apt update && apt upgrade -y

# Install dependencies
apt install -y \
    nginx \
    mysql-server \
    php8.2-fpm \
    php8.2-mysql \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-bcmath \
    php8.2-curl \
    php8.2-zip \
    php8.2-gd \
    php8.2-intl \
    redis-server \
    composer \
    supervisor \
    git \
    unzip

# Configure MySQL
mysql_secure_installation

# Create database
create_database() {
    mysql -u root -p -e "
        CREATE DATABASE emily_experience CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE USER 'emily_user'@'localhost' IDENTIFIED BY 'secure_password';
        GRANT ALL PRIVILEGES ON emily_experience.* TO 'emily_user'@'localhost';
        FLUSH PRIVILEGES;
    "
}

echo "✅ Server setup complete!"
echo "Next steps:"
echo "1. Create database: create_database"
echo "2. Configure Nginx"
echo "3. Deploy application"
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/emily-experience

server {
    listen 80;
    listen [::]:80;
    server_name emilyexperience.com www.emilyexperience.com;
    root /var/www/emily-experience/public;
    index index.php index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Logging
    access_log /var/log/nginx/emily-access.log;
    error_log /var/log/nginx/emily-error.log;

    # Location blocks
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP handling
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
        fastcgi_buffer_size 128k;
        fastcgi_buffers 4 256k;
        fastcgi_busy_buffers_size 256k;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Upload size
    client_max_body_size 64M;
}

# Enable site
# ln -s /etc/nginx/sites-available/emily-experience /etc/nginx/sites-enabled/
# nginx -t
# systemctl restart nginx
```

### PHP-FPM Pool Configuration

```ini
; /etc/php/8.2/fpm/pool.d/emily.conf

[emily]
user = www-data
group = www-data
listen = /run/php/php8.2-fpm-emily.sock
listen.owner = www-data
listen.group = www-data
listen.mode = 0660

pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
pm.max_requests = 500

; Environment variables
env[Laravel_APP_ENV] = production
env[Laravel_APP_DEBUG] = false

; Logging
php_admin_value[error_log] = /var/log/php/emily-error.log
php_admin_flag[log_errors] = on
```

### Supervisor Configuration

```ini
; /etc/supervisor/conf.d/emily-worker.conf

[program:emily-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/emily-experience/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/emily-experience/storage/logs/worker.log
stopwaitsecs=3600

[program:emily-scheduler]
command=/bin/bash -c "while true; do php /var/www/emily-experience/artisan schedule:run; sleep 60; done"
autostart=true
autorestart=true
user=www-data
stdout_logfile=/var/www/emily-experience/storage/logs/scheduler.log
```

### Environment File (.env.production)

```bash
# .env.production

APP_NAME="Emily Experience"
APP_ENV=production
APP_KEY=base64:your-generated-key-here
APP_DEBUG=false
APP_URL=https://emilyexperience.com

LOG_CHANNEL=daily
LOG_LEVEL=warning

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=emily_experience
DB_USERNAME=emily_user
DB_PASSWORD=secure_password

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=postmaster@yourdomain.com
MAIL_PASSWORD=your-mailgun-key
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@emilyexperience.com"
MAIL_FROM_NAME="${APP_NAME}"

# Payment Gateways
PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PAYMENT_URL=https://api.paystack.co

FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-...
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-...

# Cloudinary (for media storage)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Sentry (error tracking)
SENTRY_LARAVEL_DSN=https://...
SENTRY_TRACES_SAMPLE_RATE=0.1

# Commission Rate
COMMISSION_RATE=0.10

# Admin credentials
ADMIN_EMAIL=admin@emilyexperience.com
```

### Deployment Script (VPS)

```bash
#!/bin/bash
# deploy-vps.sh

set -e

APP_DIR="/var/www/emily-experience"
BACKUP_DIR="/var/backups/emily-experience"
BRANCH="main"

echo "🚀 Starting deployment..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup current version
echo "💾 Creating backup..."
if [ -d "$APP_DIR" ]; then
    BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S).tar.gz"
    tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$APP_DIR" . --exclude='storage/app/public/*'
    echo "Backup created: $BACKUP_NAME"
fi

# Clone/pull latest code
echo "📥 Getting latest code..."
if [ -d "$APP_DIR/.git" ]; then
    cd $APP_DIR
    git fetch origin
    git reset --hard origin/$BRANCH
else
    git clone -b $BRANCH https://github.com/yourusername/emily-experience.git $APP_DIR
fi

# Install dependencies
echo "📦 Installing dependencies..."
cd $APP_DIR
composer install --no-dev --optimize-autoloader --no-interaction

# Set permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data $APP_DIR
chmod -R 755 $APP_DIR/storage
chmod -R 755 $APP_DIR/bootstrap/cache

# Copy environment file
if [ ! -f "$APP_DIR/.env" ]; then
    echo "⚠️  Creating .env file from example..."
    cp $APP_DIR/.env.production $APP_DIR/.env
    php artisan key:generate
fi

# Database migrations
echo "🗄️  Running migrations..."
php artisan migrate --force

# Cache configuration
echo "⚡ Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Restart services
echo "🔄 Restarting services..."
systemctl restart php8.2-fpm
systemctl restart supervisor
systemctl reload nginx

# Health check
echo "🏥 Health check..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/up)

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Deployment successful! Site is up."
else
    echo "❌ Health check failed! HTTP status: $HTTP_STATUS"
    exit 1
fi

# Clear old backups (keep last 10)
echo "🧹 Cleaning old backups..."
ls -t $BACKUP_DIR/backup-*.tar.gz | tail -n +11 | xargs rm -f

echo "🎉 Deployment complete!"
```

## CI/CD Workflows

### GitHub Actions (Laravel)

```yaml
# .github/workflows/deploy.yml

name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.2'
        extensions: mbstring, xml, bcmath

    - name: Install dependencies
      run: composer install --prefer-dist --no-progress

    - name: Run tests
      run: vendor/bin/phpunit

    - name: Run code style check
      run: vendor/bin/pint --test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - uses: actions/checkout@v3

    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.2'

    - name: Setup SSH
      uses: webfactory/ssh-agent@v0.7.0
      with:
        ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

    - name: Deploy to server
      run: |
        ssh -o StrictHostKeyChecking=no ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} \
          'cd /var/www/emily-experience && sudo ./deploy-vps.sh'
```

### GitLab CI

```yaml
# .gitlab-ci.yml

stages:
  - test
  - build
  - deploy

variables:
  COMPOSER_CACHE_DIR: "$CI_PROJECT_DIR/.cache/composer"

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - vendor/
    - .cache/composer

test:
  stage: test
  image: php:8.2-cli
  before_script:
    - apt-get update && apt-get install -y git unzip
    - curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
  script:
    - composer install --no-interaction
    - vendor/bin/phpunit
  only:
    - merge_requests
    - main

build:
  stage: build
  image: php:8.2-cli
  script:
    - composer install --no-dev --optimize-autoloader
    - php artisan config:cache
    - php artisan route:cache
  artifacts:
    paths:
      - vendor/
      - bootstrap/cache/
  only:
    - main

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST "cd /var/www/emily-experience && ./deploy-vps.sh"
  only:
    - main
  environment:
    name: production
    url: https://emilyexperience.com
```

## Docker Deployment

### Dockerfile

```dockerfile
# Dockerfile

FROM php:8.2-fpm-alpine

# Install dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    mysql-client \
    libzip-dev \
    zip \
    unzip \
    git \
    curl

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    zip \
    opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 storage bootstrap/cache

# Copy configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Cache configuration
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: emily-app
    restart: unless-stopped
    environment:
      - APP_ENV=production
      - DB_HOST=db
      - REDIS_HOST=redis
    volumes:
      - ./storage:/var/www/storage
      - ./public/uploads:/var/www/public/uploads
    networks:
      - emily-network
    depends_on:
      - db
      - redis

  db:
    image: mysql:8.0
    container_name: emily-db
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: emily_experience
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_PASSWORD: user_password
      MYSQL_USER: emily_user
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - emily-network

  redis:
    image: redis:alpine
    container_name: emily-redis
    restart: unless-stopped
    networks:
      - emily-network

  nginx:
    image: nginx:alpine
    container_name: emily-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./public:/var/www/public
    networks:
      - emily-network
    depends_on:
      - app

networks:
  emily-network:
    driver: bridge

volumes:
  db-data:
```

## Maintenance Commands

```bash
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan event:clear

# Cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Check application health
php artisan about

# Run database health check
php artisan db:monitor

# Show queue status
php artisan queue:monitor

# Backup database
mysqldump -u root -p emily_experience > backup-$(date +%Y%m%d-%H%M%S).sql
```

## Output Format

When generating deployment configs:
1. Provide complete, ready-to-use files
2. Include comments explaining each section
3. Show commands to enable/configure
4. Include security best practices
5. Add rollback instructions
