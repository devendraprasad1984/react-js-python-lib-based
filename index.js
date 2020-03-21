'use strict';
//in es6 support for implicit return as arrow function doesnt need {} or return for single statements
//this is statless component, Functional Components (Arrow Function from ES6)
const Cat = props => <div> this is my cat of name <b>{props.name} - {props.color}</b></div>;
// React Higher-Order Component: function takes a compoent and returns new component used to "component logic reuse". eg redux connect is HOC or pure function
//dont mutate original component in HOC rather enhance it using composition
// eg. const EnhancedComponent = enhance(WrappedComponent);
// //basic react classes would go here
//this is stateful component, class bases used state

//getting global object from window global variable in browser window
const gr = window.React;
const {HashRouter, Switch, Route, Link} = window.ReactRouterDOM;
const ax = window.axios;
const ag = window.agGrid;
const {hostname,origin,href,pathname} = window.location;
const qr=window.QRCode;


let forms = {
    names: ['Project Details', 'Capex/Revx', 'Costs', 'Benefits'],
    0: [{rowName: 'Net Interest Income', cols: [0, 0, 0, 0, 0]}, {
        rowName: 'Input values for ledger',
        cols: [0, 0, 0, 0, 0]
    }, {
        rowName: 'Gross Income Budget',
        cols: [0, 0, 0, 0, 0]
    }],
    1: [{rowName: 'ABC', cols: [0, 0, 0, 0, 0, 0, 0]}, {rowName: 'XYZ', cols: [0, 0, 0, 0, 0, 0, 0]}, {
        rowName: 'WHAT A LINE',
        cols: [0, 0, 0, 0, 0, 0, 0]
    }],
    2: [{rowName: 'ABC', cols: [0, 0, 0]}, {rowName: 'XYZ', cols: [0, 0, 0]}, {
        rowName: 'WHAT A LINE',
        cols: [0, 0, 0]
    }],
    3: [{rowName: 'ABC', cols: [0, 0, 0, 0, 0, 0, 0, 0]}, {rowName: 'XYZ', cols: [0, 0, 0, 0, 0, 0, 0, 0]}, {
        rowName: 'WHAT A LINE',
        cols: [0, 0, 0, 0, 0, 0, 0, 0]
    }]
}
let fKeys = Object.keys(forms);


//stateless functional component and no need to use bind(this) and is easy
const setRouting = () => {
    return <HashRouter>
        <div className="bg-info">
            <Link to="/">Home</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/about">About</Link>
            <Link to="/grid">Grid</Link>
            <Link to="/qr">QR</Link>
        </div>
        <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/budget"><Budget title={'Budget Input Form'} callback={DisplayBudgetForms}/></Route>
            <Route path="/about"><About/></Route>
            <Route path="/grid"><Grid/></Route>
            <Route path="/qr"><QRApp/></Route>
            <Route path="*" component={NotFound}/>
        </Switch>
    </HashRouter>
}

const NotFound = () => {
    return (
        <div>
            <h1>Page Not Found</h1><br/>
            <h2><a href="/">Home</a></h2>
        </div>
    )
}

const Accordian = ({name, header, counter}) => {
    const [heading, setHeading] = gr.useState(header); //similar to this.setState in class based component
    const [formKeys, setFormKeys] = gr.useState(fKeys);
    gr.useEffect(() => {
        // Similar to componentDidMount and componentDidUpdate:
        // console.log("cur heading: ", heading);
    }, []);
    let getFormDetails = (keyid) => {
        let formElm = []
        if (formKeys.indexOf(keyid) !== -1) {
            //found in forms Array
            let formX = forms[keyid];
            for (let fm in formX) {
                let {rowName, cols} = formX[fm];
                formElm.push(<form>
                    <div className="customInputText"><span className="text-primary xlable">{rowName}</span> <span
                        className="nestInput">{cols.map(c => <input className="text-primary" type="text"
                                                                    value="0"/>)}</span>
                    </div>
                </form>)
            }
        }
        return formElm;
    }
    let what2save = () => {
        console.log('what to save is', heading);
    }
    return (
        <div>
            <h1 className="btn" style={{width: '100%', textAlign: 'left'}}><span
                className="badge bg-info">{counter + 1} - {heading}</span></h1>
            <div className="column box">
                <div>
                    {getFormDetails(counter.toString())}
                    <button className="btn bg-primary text-white" onClick={() => what2save()}>Save</button>
                    <button className="btn bg-dark text-white">Next</button>
                </div>
            </div>
        </div>
    )
}

const DisplayBudgetForms = () => forms.names.map((x, id) => <div><Accordian counter={id} header={x}/></div>);

const Home = () => {
    return (
        <div>
            <h1>Home Contents</h1>
            <div>
                <span className="badge bg-danger text-white">HTML5+ReactJs+Babel+CSS+Vanila JS</span>
            </div>
        </div>
    )
}

const FetchFromAPIs = (url, callback) => {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => callback({error}));
}

const About = () => {
    let [users, setUsers] = gr.useState([]);
    gr.useEffect(() => {
        getUsers((data) => {
            setUsers(data);
            console.log(data)
        });
    }, []); //to execute component render exactly once and set state of object users
    let getUsers = async (callback) => {
        let res = await ax.get("https://jsonplaceholder.typicode.com/users");
        callback(res.data);
    }
    let displayUsers = () => {
        if(users.length===0){
            return <div><h1 className="text-danger">Loading users data.... plz wait...</h1></div>
        }
        return <div>{
            users.map((x, id) => <div key={"disp_user_" + id}>
                <span>{x.name}</span> <span>{x.email}</span> <span>{x.username}</span><span>{x.address.zipcode}</span>
            </div>)
        }
        </div>
    }
    return (
        <div>
            <h1>About Contents</h1>
            {displayUsers()}
        </div>
    )
}
const Grid = () => {
    const mgrid=gr.useRef(null);
    const cars=gr.useRef(null);
    let loadGridData = async (e,url) => {
        let cur=e.target;
        e.preventDefault();
        let oldTextVal=cur.innerHTML;
        cur.innerHTML='<span class="badge bg-warning text-danger">Loading...</span>';
        let gridDiv = document.getElementById('myGrid');
        gridDiv.innerHTML='';
        let res=await ax.get(url);
        let rowData = res.data;
        let colKeys=Object.keys(rowData[0]);
        let columnDefs = colKeys.map(x=>{return {headerName: x, field: x,minWidth:150}} );
        let gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData,
            defaultColDef: {
                flex:1,
                sortable: true,
                filter: true,
                resizable: true,
            },
            pagination: true,
            rowSelection: 'single',
            onRowClicked: function(event) { console.log('A row was clicked'); },
            onColumnResized: function(event) { console.log('A column was resized'); },
            onGridReady: function(event) { console.log('The grid is now ready'); },
            // isScrollLag: function() { return false; }
        };
        new ag.Grid(gridDiv, gridOptions);
        cur.innerHTML=oldTextVal;
        // gridOptions.api.redrawRows();
        // gridOptions.columnApi.sizeColumnsToFit();
        // ag.simpleHttpRequest({url: url}).then(function(data) {
        //     let colKeys=Object.keys(data[0]);
        //     let columnDefs = colKeys.map(x=>{return {headerName: x, field: x,minWidth:150}} );
        //     gridOptions.api.setColumnDefs(columnDefs);
        //     gridOptions.api.setRowData(data);
        // });
    }
    return (
        <div>
            <h1>Grid Contents</h1>
            <button ref={cars} className="btn bg-primary text-white" onClick={(e) => loadGridData(e,"https://api.myjson.com/bins/15psn9")}>Cars</button>
            <button className="btn bg-secondary text-white" onClick={(e) => loadGridData(e,"https://jsonplaceholder.typicode.com/albums")}>Album</button>
            <button className="btn bg-danger text-white" onClick={(e) => loadGridData(e,"https://jsonplaceholder.typicode.com/posts")}>Posts</button>
            <button className="btn bg-success text-white" onClick={(e) => loadGridData(e,"https://jsonplaceholder.typicode.com/comments")}>Comments</button>
            <div ref={mgrid} id="myGrid" style={{height: '400px', width:'100%'}} className="ag-theme-balham"></div>
        </div>
    )
}
const QRApp = () => {
    let qrdiv=gr.useRef(null);
    let qrInputVal=gr.useRef(null);
    const makeCode=()=>{
        let div2loadQrIn=qrdiv.current;
        let qrInputValText=qrInputVal.current.value;
        div2loadQrIn.innerHTML='';
        let qrcode=new qr(div2loadQrIn,{
            text: qrInputValText,
            width: 300,
            height: 300,
            colorDark : "black",
            colorLight : "white",
            correctLevel : qr.CorrectLevel.H
        });
        // qrcode.clear(); // clear the code.
        // qrcode.makeCode(qrInputValText); // make another code.
    }
    return (
        <div>
            <h1>QR Contents</h1>
            <div>
                <button className="btn btn-dark" onClick={()=>makeCode()}>Generate Code</button>
                <div><input className="w3-input" type="text" id='qrInputVal' value={"enter your text"} ref={qrInputVal}/></div><br/>
            </div>
            <div id='qrdiv' ref={qrdiv}></div>
        </div>
    )
}

const Budget = ({title, callback}) => {
    return (
        <div>
            <h1 className="bg-dark text-white" style={{padding: '5px'}}>{title}</h1>
            {callback()}
        </div>
    );
}

const App = () => {
    return <div>{setRouting()}</div>;
}

// ReactDOM.render(e(ReactDiv1Component), document.querySelector('#reactDiv1'));
// grdom.render(<Budget title={'Budget Input Form'} name="global page heading" callback={DisplayBudgetForms}/>, document.getElementById('root'));
window.ReactDOM.render(<App/>, document.getElementById('root'));
// let icomp1=<ReactDiv2Component age='20'/>;
// ReactDOM.render(icomp1, document.getElementById('reactDiv2'));
// ReactDOM.render(<ReactDiv3Component/>, document.getElementById('reactDiv3'));
