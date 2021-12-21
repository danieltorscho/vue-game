#!/usr/bin/env sh

# abort on errors
set -e

rm -rf docs

npm run build

mv dist docs

# cd dist

# git init
git add -A
git commit -m 'deploy'
git push -f

# git push -f git@github.com:danieltorscho/vue-game.git main:gh-pages

# cd -