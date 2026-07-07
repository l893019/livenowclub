#!/bin/zsh
# Weekly Substack -> livenowclub.com sync. Run by launchd
# (~/Library/LaunchAgents/com.louiseireland.livenowclub-sync.plist).
#
# Pulls new essays via scripts/sync-substack.mjs, and only if something
# changed: builds the site, commits, and pushes (Vercel deploys on push).
# Curation (pathways, pull quotes, hero rotation) stays a human decision.
set -euo pipefail
export PATH="/usr/local/bin:$HOME/.npm-global/bin:/usr/bin:/bin:$PATH"

cd "$HOME/livenowclub-repo"
echo "=== livenowclub sync $(date '+%Y-%m-%d %H:%M') ==="

if [[ -n "$(git status --porcelain -- content/essays public/images src/lib/essays.ts)" ]]; then
  echo "repo already has uncommitted changes in sync-managed paths; aborting to avoid mixing work"
  exit 1
fi

node scripts/sync-substack.mjs --update-image-map

if [[ -z "$(git status --porcelain -- content/essays public/images src/lib/essays.ts)" ]]; then
  echo "nothing new — done"
  exit 0
fi

pnpm build

git add content/essays public/images src/lib/essays.ts
git commit -m "Auto-sync new essays from Substack

Automated weekly sync (scripts/weekly-sync.sh). New essays may still
want curation: PATHWAYS / PULL_QUOTES in src/lib/essays.ts and
HERO_ROTATION in src/app/page.tsx.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push origin main
echo "synced, built, and pushed — Vercel will deploy"
