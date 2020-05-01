#!/bin/bash
# 0.build to grenerate build folder
npm run build

# 1.push to main branch
#git add .
#git commit -m 'update'
#git push

# 2.push build folder to master branch
#git push origin `git subtree split --prefix build main`:mater --force

## 1. go to build which is the master branch
cd dist
rm -rf *
mv ../build/ .
git add .
git commit -m 'update'
git push -u origin master -f
