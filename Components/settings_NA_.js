(function () {
    'use strict'
    var gset = {
        debug: false
    }
    var CSettings = {
        settings: function (key, val) {
            if (!(key in gset)) return;
            gset[key] = val;
        },
        getSetting: function (key) {
            if (key) return gset[key];
            return Object.assign({}, gset);
        }
    }
    myApp.extend('CSettings', CSettings)
})()