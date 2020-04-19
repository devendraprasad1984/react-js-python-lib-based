(function(){
    'use strict';
    g_dp_app.extend('linksArr' , ['/','/budget','/about','/grid','/qr','/pdf_csv']);
    g_dp_app.extend('gr' , window.React);
    g_dp_app.extend('ts' , window.toastr);
    g_dp_app.extend('gdom' , window.ReactRouterDOM);
    g_dp_app.extend('ax' , window.axios);
    g_dp_app.extend('ag' , window.agGrid);
    g_dp_app.extend('loc' , window.location);
    g_dp_app.extend('fetch' , window.fetch);
    g_dp_app.extend('pdf' , window.jsPDF);
    g_dp_app.extend('qr' , window.QRCode);
    g_dp_app.extend('forms', {
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
    });
    g_dp_app.extend('fKeys',  Object.keys(g_dp_app.forms));
})();
