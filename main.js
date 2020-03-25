var g_dp_app=(function () {
    'use strict'
    const libs = {
        jsdir:'Components',
        js: ["globals", "Home", "Routing", "NotFound", "Accordian", "BudgetForm", "Helpers", "About", "Grid","PDF_CSV", "QR","App"]
    };
    function fnLoad(arr) {
        let jsDir=libs.jsdir;
        for (let i = 0; i < arr.length; i++) {
            let fName=jsDir+'/'+ arr[i]+'.js'
            var s = document.createElement('script');
            s.type = 'text/babel';
            s.crossOrigin = 'anonymous';
            s.src = fName;
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(s);
        }
    }
    fnLoad(libs.js);
    var methods={};
    methods.extend=function(name,fn){
        methods[name]=fn
    }
    return methods;
})(); //IIFE - Immediately invoked function expression