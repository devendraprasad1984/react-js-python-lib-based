var g_dp_app=(function () {
    'use strict'
    const libs = {
        jsdir:'Components',
        js: ["globals", "Home", "Routing", "NotFound","Modal", "Accordian", "BudgetForm", "Helpers", "About", "Grid","PDF_CSV", "QR","App"]
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
    } //internally to js, extends uses prototype based inheritence ie t can be loosely described by saying that when methods or properties are attached to object’s prototype they become available for use on that object and its descendants
    //similar to
    // Array.prototype.sum=function(){return this.reduce((a,b)=>a+b,0)}
    //[...[1,2,13,4],...[111,22,3,4],...[1,2,334,4]].sum()

    // Array.prototype.sumx=function(){return this.map(x=>x.reduce((a,b)=>a+b,0)).reduce((a,b)=>a+b,0)}
    // [[1,2,13,4],[111,22,3,4],[1,2,334,4]].sumx()

    return methods;
})(); //IIFE - Immediately invoked function expression
//
// (function(){
//     let acc=document.getElementsByClassName("accordion");
//     for (let i = 0; i < acc.length; i++) {
//         acc[i].addEventListener("click", function() {
//             this.classList.toggle("active");
//             var panel = this.nextElementSibling;
//             if (panel.style.display === "block") {
//                 panel.style.display = "none";
//             } else {
//                 panel.style.display = "block";
//             }
//         });
//     }
// })();