# nodejs-es6-app-skeleton

A Node.js application skeleton, using ES6 and some unit-testing basics.

## Setup a new project:

```
mkdir project-name
cd project-name
git clone https://github.com/branneman/nodejs-es6-app-skeleton.git .
rm readme.md
rm -rf .git
touch readme.md
git init
npm install
npm install -g gulp
git add -A
git commit -m 'Initial commit, added es6-app-skeleton'
git remote add origin https://github.com/example/project-name.git
git push -u origin master
git update-index --assume-unchanged .coveralls.yml
npm start
```

### Compiling ES6
Once you start the app with `npm start`, the ES6 files will be compiled into ES5. You could also run `gulp` manually to
compile ES6 just once.

### Watching files
To save you the burden of having to fire off compilation after every change, you can make gulp watch for changes with the
`gulp watch` command.

### Push coverage to Coveralls
Simply run `gulp coveralls`.
