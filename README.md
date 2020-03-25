# react-js-python-lib-based
react project pure vanila js type without use of npm, pure js lib based react project. python+tornado+mysql will act as backend

you can simply place the project into any http web server and it would run seemlessly without use of node

mail me, if you like this approach also of using react js lib, i will keep on adding vanila js examples using reactJs Lib apprach
@devendraprasad1984@gmail.com


##using cpx below as watcher
###https://www.npmjs.com/package/cpx
   $ cpx "src/**/*.{html,png,jpg}" app --watch
   
   $ cpx "src/**/*.{html,png,jpg}" app -w & watchify src/index.js -o app/index.js
   
   $ cpx "src/**/*.js" app -w -c "babel --source-maps inline"
   
   $ cpx "src/**/*.js" app -w -t babelify -t uglifyify
   
   ###for my project i am using below
   $ cpx "Components/*.js" app -w -c "bash merge_runAlways_its_like_compile_all_into_one.sh"

#OR
https://browsersync.io/#install

npm install -g browser-sync

browser-sync start --server --files "*.html, css/*.css, Components/*.js"
