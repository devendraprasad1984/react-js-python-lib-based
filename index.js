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
const {hostname, origin, href, pathname} = window.location;
const qr = window.QRCode;
const fetch = window.fetch;

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


//stateless functional component and no need to use bind(this) and is easy
const setRouting = () => {
    return <HashRouter>
        <div className="bg-info sidenav">
            <Link to="/">Home</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/about">About</Link>
            <Link to="/grid">Grid</Link>
            <Link to="/qr">QR</Link>
        </div>
        <div className="rightContainer">
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route path="/budget"><Budget title={'Budget Input Form'} callback={DisplayBudgetForms}/></Route>
                <Route path="/about"><About/></Route>
                <Route path="/grid"><Grid/></Route>
                <Route path="/qr"><QRApp/></Route>
                <Route path="*" component={NotFound}/>
            </Switch>
        </div>
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

    // WRITE THE VALIDATION SCRIPT.
    function isNumber(evt) {
        var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
        console.log(iKeyCode);
        if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
            return false;
        return true;
    }

    let getFormDetails = (keyid) => {
        let formElm = []
        if (formKeys.indexOf(keyid) !== -1) {
            //found in forms Array
            let formX = forms[keyid];
            for (let fm in formX) {
                let {rowName, cols} = formX[fm];
                formElm.push(<div className="customInputText">
                    <span className="text-primary xlable">{rowName}</span>
                    <span className="nestInput">{cols.map(c => <input className="text-primary" type="text"
                                                                      defaultValue={c}/>)}</span>
                </div>);
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
    const mform = gr.useRef(null);
    let handleSubmit = (e) => {
        console.log(mform.current, mform.current.childNodes);
        e.preventDefault();
    }
    return (
        <div>
            <h1>Home Contents</h1>
            <div>
                <span className="badge bg-danger text-white">HTML5+ReactJs+Babel+CSS+Vanila JS</span>
            </div>
            <h2>testing a way of handling input form</h2>
            <form ref={mform} onSubmit={e => handleSubmit(e)}>
                <input type="text"/>
                <input type="submit" value="Submit" className="btn bg-warning"/>
            </form>
        </div>
    )
}


//older js callbacks way, similar to return new Promise(resolve,reject), works with IE also, use axios otherwise
const getFromWeb = function (raw, uri, resolve, reject) {
    let req = new XMLHttpRequest();
    req.onload = function () {
        var data = JSON.parse(this.response);
        if (req.status >= 200 && req.status < 400) {
            let vals2display = raw ? data : '';
            resolve(vals2display);
        } else {
            req.onerror = reject(req.statusText);
        }
    }
    req.open('GET', uri, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.send();
}
const Post2Web = function (uri, data, resolve, reject) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        var data = JSON.parse(this.response);
        if (req.status >= 200 && req.status < 400) {
            let vals2display = raw ? data : '';
            resolve(vals2display);
        } else {
            req.onerror = reject(req.statusText);
        }
    }
    req.open('POST', uri, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(data);
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
            // console.log(data)
        });
    }, []); //to execute component render exactly once and set state of object users
    let getUsers = (callback) => {
        ax.get("https://jsonplaceholder.typicode.com/users").then(function (res) {
            console.log(res.data);
            callback(res.data);
        }).catch(function (err) {
            console.log(err)
        });
    }
    let displayUsers = () => {
        if (users.length === 0) {
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
            <h1>Grid Contents</h1>
            <button className="btn bg-secondary text-white"
                    onClick={(e) => loadGridData(e, "https://jsonplaceholder.typicode.com/albums")}>Album
            </button>
            <button className="btn bg-danger text-white"
                    onClick={(e) => loadGridData(e, "https://jsonplaceholder.typicode.com/posts")}>Posts
            </button>
            <button className="btn bg-success text-white"
                    onClick={(e) => loadGridData(e, "https://jsonplaceholder.typicode.com/comments")}>Comments
            </button>
            <div ref={mgrid} id="myGrid" style={{height: '400px', width: '100%'}} className="ag-theme-balham"></div>
        </div>
    )
}
const QRApp = () => {
    let qrdiv = gr.useRef(null);
    let qrInputVal = gr.useRef(null);
    const makeCode = () => {
        let div2loadQrIn = qrdiv.current;
        let qrInputValText = qrInputVal.current.value;
        div2loadQrIn.innerHTML = '';
        let qrcode = new qr(div2loadQrIn, {
            text: qrInputValText,
            width: 300,
            height: 300,
            colorDark: "black",
            colorLight: "white",
            correctLevel: qr.CorrectLevel.H
        });
        // qrcode.clear(); // clear the code.
        // qrcode.makeCode(qrInputValText); // make another code.
    }
    return (
        <div>
            <h1>QR Contents</h1>
            <div>
                <button className="btn btn-dark" onClick={() => makeCode()}>Generate Code</button>
                <div><input className="w3-input" type="text" id='qrInputVal' placeholder="enter text here"
                            ref={qrInputVal}/></div>
                <br/>
            </div>
            <div id='qrdiv' ref={qrdiv}></div>
        </div>
    )
}

const Budget = ({title, callback}) => {
    // const [formData,setFormData]=gr.useState({});
    let submitBudget = () => {
        let textElms = document.getElementsByClassName('customInputText');
        let xformObj = {};
        let formKeyText = '';
        for (let i = 0; i < textElms.length; i++) {
            let children = textElms[i].childNodes;
            formKeyText = children[0].innerHTML.toString();
            let allInputTexts = children[1].childNodes;
            let vals = {};
            for (let j = 0; j < allInputTexts.length; j++) {
                vals['col_' + j] = j;
                vals['val_' + j] = parseFloat(allInputTexts[j].value);
            }
            xformObj[formKeyText] = vals;
        }
        console.log(xformObj);
        alert('check console, form data object has been generated, send this to server using fetch post command and handle response');
    }
    // gr.useEffect(()=>{
    //    console.log(formData);
    // },[])
    return (
        <div>
            <h1 className="bg-dark text-white" style={{padding: '5px'}}>{title}</h1>
            <div>
                <button className="btn bg-dark" onClick={() => submitBudget()}>Submit</button>
                <button className="btn bg-danger">Reset</button>
            </div>
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
