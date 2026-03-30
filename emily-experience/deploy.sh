#!/bin/bash
# deploy.sh - Emily Experience Deployment Script

echo "🚀 Starting Emily Experience deployment..."

# Configuration
APP_DIR="/var/www/emily-experience"
BACKUP_DIR="/var/backups/emily-experience"
LOG_FILE="/var/log/emily-deploy.log"
BRANCH="main"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Log function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root"
   exit 1
fi

# Create backup directory
mkdir -p $BACKUP_DIR

# Step 1: Backup
echo ""
log "📦 Step 1: Creating backup..."
if [ -d "$APP_DIR" ]; then
    BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S).tar.gz"
    tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$APP_DIR" . --exclude='storage/app/public/*' --exclude='node_modules' --exclude='.git'
    log "✅ Backup created: $BACKUP_NAME"
else
    warning "App directory not found, skipping backup"
fi

# Step 2: Update code
echo ""
log "📥 Step 2: Updating code..."
if [ -d "$APP_DIR/.git" ]; then
    cd $APP_DIR
    git fetch origin
    git reset --hard origin/$BRANCH
    log "✅ Code updated from branch: $BRANCH"
else
    error "Git repository not found!"
    exit 1
fi

# Step 3: Install dependencies
echo ""
log "📦 Step 3: Installing dependencies..."
cd $APP_DIR

# PHP dependencies
if command -v composer &> /dev/null; then
    composer install --no-dev --optimize-autoloader --no-interaction
    log "✅ PHP dependencies installed"
else
    warning "Composer not found, skipping PHP dependencies"
fi

# Step 4: Set permissions
echo ""
log "🔐 Step 4: Setting permissions..."
sudo chown -R www-data:www-data $APP_DIR
sudo chmod -R 755 $APP_DIR/storage
sudo chmod -R 755 $APP_DIR/bootstrap/cache
log "✅ Permissions set"

# Step 5: Environment setup
echo ""
log "⚙️  Step 5: Environment setup..."
if [ ! -f "$APP_DIR/.env" ]; then
    if [ -f "$APP_DIR/.env.example" ]; then
        cp $APP_DIR/.env.example $APP_DIR/.env
        log "✅ Environment file created from example"
    else
        warning "No .env.example found"
    fi
else
    log "✅ Environment file exists"
fi

# Generate app key if not set
if [ -f "$APP_DIR/.env" ]; then
    if ! grep -q "^APP_KEY=base64:" "$APP_DIR/.env"; then
        php artisan key:generate
        log "✅ Application key generated"
    fi
fi

# Step 6: Database migrations
echo ""
log "🗄️  Step 6: Running database migrations..."
cd $APP_DIR

if command -v php &> /dev/null; then
    php artisan migrate --force
    if [ $? -eq 0 ]; then
        log "✅ Database migrations completed"
    else
        error "Database migrations failed!"
        exit 1
    fi
else
    warning "PHP not found, skipping migrations"
fi

# Step 7: Optimize application
echo ""
log "⚡ Step 7: Optimizing application..."
cd $APP_DIR

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

log "✅ Application optimized"

# Step 8: Restart services
echo ""
log "🔄 Step 8: Restarting services..."

# Restart PHP-FPM
if command -v systemctl &> /dev/null; then
    if systemctl is-active --quiet php8.2-fpm; then
        sudo systemctl restart php8.2-fpm
        log "✅ PHP-FPM restarted"
    elif systemctl is-active --quiet php8.1-fpm; then
        sudo systemctl restart php8.1-fpm
        log "✅ PHP-FPM restarted"
    elif systemctl is-active --quiet php8.0-fpm; then
        sudo systemctl restart php8.0-fpm
        log "✅ PHP-FPM restarted"
    else
        warning "PHP-FPM not found"
    fi

    # Restart Supervisor
    if systemctl is-active --quiet supervisor; then
        sudo systemctl restart supervisor
        log "✅ Supervisor restarted"
    fi

    # Reload Nginx
    if systemctl is-active --quiet nginx; then
        sudo systemctl reload nginx
        log "✅ Nginx reloaded"
    fi
fi

# Step 9: Health check
echo ""
log "🏥 Step 9: Health check..."

# Check if site is up
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/up)

if [ "$HTTP_STATUS" = "200" ]; then
    log "✅ Health check passed! Site is up."
else
    error "Health check failed! HTTP status: $HTTP_STATUS"
    exit 1
fi

# Step 10: Cleanup
echo ""
log "🧹 Step 10: Cleanup..."

# Clear old backups (keep last 10)
if [ -d "$BACKUP_DIR" ]; then
    ls -t $BACKUP_DIR/backup-*.tar.gz 2>/dev/null | tail -n +11 | xargs rm -f
    log "✅ Old backups cleaned"
fi

# Clear temporary files
php artisan cache:clear --tags=temp 2>/dev/null || true

echo ""
log "🎉 Deployment complete!"
echo ""
echo "Application URL: https://emilyexperience.com"
echo "Backup location: $BACKUP_DIR"
echo "Log file: $LOG_FILE"
