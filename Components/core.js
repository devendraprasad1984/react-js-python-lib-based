var myApp=(function(){
    'use strict';
    var methods={};
    methods.extend=function(name,fn){
        methods[name]=fn
    }
    return methods;
})()