'use strict'
const {hostname} = window.location;
const libs={
    locals:["js/react.js","js/reactdom.js","js/redux.min.js","js/react-redux.min.js","js/react-router.min.js","js/react-router-dom.js","js/babel-browser.min.js","js/polyfill.min.js?features=fetch&flags=gated","js/axios.min.js","js/ag-grid-community.min.js"],
    cdn:[]
};

(function(){
    //check if not localhost,load scripts and global css from CDN else from local
    if(hostname.toLowerCase()!=='localhost'){
        console.log(hostname,'load from CDN');
    }else{
        console.log(hostname,'load from local dirs');
        var head=document.getElementsByTagName('head')[0];
        libs.locals.map(function(v){
            var s=document.createElement('script');
            s.type='text/javascript';
            s.crossOrigin='anonymous';
            s.src=v;
            head.append(s);
        })
    }
})(); //IIFE - Immediately invoked function expression
//
//
// function callAll(jsfiles) {
//     var src = document.createElement("script");
//     src.setAttribute("type", "text/javascript");
//     src.setAttribute("src", jsfiles);
//     document.getElementsByTagName("head")[0].appendChild(src);
// }
// callAll("your/path/to/a/jsfile1.js");
// callAll("your/path/to/a/jsfile2.js");
// callAll("your/path/to/a/jsfile3.js");