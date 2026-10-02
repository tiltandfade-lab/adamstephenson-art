#!/usr/bin/env bash
# Build for Cloudflare Pages: copy only the public site into dist/.
# Keeps the Stitch mockups (some over Cloudflare's 25 MB file limit),
# CLAUDE.md, and other working notes out of the published site.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist
mkdir -p dist/docs
cp ./*.html ./*.js sitemap.xml robots.txt dist/
cp -R images gallery dist/
cp docs/*.pdf dist/docs/
echo "dist/ ready: $(find dist -type f | wc -l | tr -d ' ') files"
