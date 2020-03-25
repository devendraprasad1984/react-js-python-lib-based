(function () {
    const {gr,ax}=g_dp_app;
    const PDF_CSV = () => {
        let [users, setUsers] = gr.useState([]);
        gr.useEffect(() => {
           console.log('pdf/csv is loaded');
        }, []); //[] to execute component render exactly once and set state of object users
        let getUsers = (callback) => {
            ax.get("https://jsonplaceholder.typicode.com/users").then(function (res) {
                // console.log(res.data);
                callback(res.data);
            }).catch(function (err) {
                console.log(err)
            });
        }
        const rows = [
            ["name1", "city1", "some other info"],
            ["name2", "city2", "more info"],
            ["name2", "city2", "more info"],
            ["name2", "city2", "more info"],
            ["name2", "city2", "more info"],
            ["name2", "city2", "more info"],
            ["name2", "city2", "more info"],
        ];
        let generateCSV=()=>{
            let delim='|'
            let csvContent = "data:text/csv;charset=utf-8,"
                + rows.map(e => e.join(delim)).join("\n");
            var encodedUri = encodeURI(csvContent);
            // window.open(encodedUri);//option1
            var link_download = document.createElement("a");
            link_download.href= encodedUri;
            link_download.download= "customers.csv";
            document.body.appendChild(link_download);
            link_download.click();
            document.body.removeChild(link_download);
        }
        let displayRows=()=>{
            return (
                rows.map(x=><div>{x[0]} | {x[1]} | {x[2]}</div>)
            )
        }
        return (
            <div>
                <h1>PDF/CSV Exports goes here</h1>
                <button className="btn bg-warning text-danger" onClick={()=>generateCSV()}>Generate CSV</button>
                <div>
                    {displayRows()}
                </div>
            </div>
        )
    }
    g_dp_app.extend('PDF_CSV',PDF_CSV);

})();
