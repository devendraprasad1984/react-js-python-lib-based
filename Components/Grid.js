(function(){
    const {gr,ax,ag}=g_dp_app;
    const Grid = () => {
        const mgrid = gr.useRef(null);
        let loadGridData = (e, url) => {
            let cur = e.target;
            e.preventDefault();
            let oldTextVal = cur.innerHTML;
            cur.innerHTML = 'Loading...';
            ax.get(url).then(function (res) {
                handleGridData(res.data);
                cur.innerHTML = oldTextVal;
            }).catch(function (err) {
                cur.innerHTML = 'error, check console logs, and it works in chrome...';
                console.log(err);
            });
        }
        const handleGridData = (data) => {
            let colKeys = Object.keys(data[0]);
            let columnDefs = [];
            for (let i = 0; i < colKeys.length; i++) {
                columnDefs.push({headerName: colKeys[i], field: colKeys[i], minWidth: 150});
            }
            let gridOptions = {
                columnDefs: columnDefs,
                rowData: data,
                defaultColDef: {
                    flex: 1,
                    sortable: true,
                    filter: true,
                    resizable: true,
                },
                pagination: true,
                rowSelection: 'single',
                onRowClicked: function (event) {
                    console.log('A row was clicked');
                },
                onColumnResized: function (event) {
                    console.log('A column was resized');
                },
                onGridReady: function (event) {
                    console.log('The grid is now ready');
                },
                // isScrollLag: function() { return false; }
            };
            console.log(mgrid, gridOptions);
            let gridDiv = document.getElementById(mgrid.current.id);
            gridDiv.innerHTML = '';
            new ag.Grid(gridDiv, gridOptions);
        }
        return (
            <div>
                <h1 className="ribbon">Grid Contents</h1>
                <button className="btn secondary"
                        onClick={(e) => loadGridData(e, "https://jsonplaceholder.typicode.com/albums")}>Album
                </button>
                <button className="btn secondary"
                        onClick={(e) => loadGridData(e, "https://jsonplaceholder.typicode.com/posts")}>Posts
                </button>
                <button className="btn red"
                        onClick={(e) => loadGridData(e, "https://jsonplaceholder.typicode.com/comments")}>Comments
                </button>
                <div ref={mgrid} id="myGrid" style={{height: '400px', width: '100%'}} className="ag-theme-balham"></div>
            </div>
        )
    }

    g_dp_app.extend('Grid',Grid);

})();

