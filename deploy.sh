#!/usr/bin/env sh
set -e

npm run build

cp -R dist/* .
git add .
git commit -m "Add built files"
git push -f git@github.com:SmilingSoul-web/vue2-12306.git main:gh-pages