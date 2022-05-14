npm run build

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:oussamaxx/LoaderParam.git master:gh-pages

cd -