#!/bin/zsh
set -e

# Local frontend deployment script
# Usage: ./deploy.sh

# ── Config ────────────────────────────────────────────────────────────────────
URL="hanzi.fullstack.cat"
LOCAL_DIST="./public_html/"
SSH_HOST="hostinger"
REMOTE_USER="hanzi1404"
REMOTE_GROUP="hanzi1404"
REMOTE_PATH="/home/hanzi.fullstack.cat/public_html/"
# ─────────────────────────────────────────────────────────────────────────────

echo "=== DEPLOYING FRONTEND: $URL ==="

echo "Syncing to server"

rsync -avz --delete \
    --chown=$REMOTE_USER:$REMOTE_GROUP \
    --chmod=D755,F644 \
    $LOCAL_DIST $SSH_HOST:$REMOTE_PATH

echo "✓ Frontend deployment complete! Check the site."
