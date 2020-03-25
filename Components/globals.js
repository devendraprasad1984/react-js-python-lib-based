'use strict';
const gr = window.React;
const req = window.requirejs;
const {HashRouter, Switch, Route, Link} = window.ReactRouterDOM;
const ax = window.axios;
const ag = window.agGrid;
const {hostname, origin, href, pathname} = window.location;
const qr = window.QRCode;
const fetch = window.fetch

let forms = {
    names: ['Project Details', 'Capex/Revx', 'Costs', 'Benefits'],
    0: [{rowName: 'Net Interest Income', cols: [0, 0, 0, 0, 0]}, {
        rowName: 'Input values for ledger',
        cols: [0, 0, 0, 0, 0]
    }, {
        rowName: 'Gross Income Budget',
        cols: [0, 0, 0, 0, 0]
    }],
    1: [{rowName: 'line4', cols: [0, 0, 0, 0, 0, 0, 0]}, {rowName: 'line5', cols: [0, 0, 0, 0, 0, 0, 0]}, {
        rowName: 'line6',
        cols: [0, 0, 0, 0, 0, 0, 0]
    }],
    2: [{rowName: 'line7', cols: [0, 0, 0]}, {rowName: 'line8', cols: [0, 0, 0]}, {
        rowName: 'line9',
        cols: [0, 0, 0]
    }],
    3: [{rowName: 'line10', cols: [0, 0, 0, 0, 0, 0, 0, 0]}, {rowName: 'line11', cols: [0, 0, 0, 0, 0, 0, 0, 0]}, {
        rowName: 'line12',
        cols: [0, 0, 0, 0, 0, 0, 0, 0]
    }]
}
let fKeys = Object.keys(forms);