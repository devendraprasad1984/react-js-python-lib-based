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
const ax = window.axios;
const {HashRouter, Switch, Route, Link, Redirect} = window.ReactRouterDOM;

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
            <Route path="/qr"><QR/></Route>
            <Redirect from="/about" to="/users"/>
        </Switch>
    </HashRouter>
}

const Accordian = ({name, header, counter}) => {
    const [heading, setHeading] = gr.useState(header); //similar to this.setState in class based component
    const [formKeys, setFormKeys] = gr.useState(fKeys);
    gr.useEffect(() => {
        // Similar to componentDidMount and componentDidUpdate:
        console.log("cur heading: ", heading);
    });
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

const DisplayBudgetForms = () => {
    return forms.names.map((x, id) => <div><Accordian counter={id} header={x}/></div>);
}

const Home = () => {
    return (
        <div>
            <h1>Home Contents</h1>
        </div>
    )
}

const FetchUsers = (url, callback) => {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => callback({error}));
}

const About = () => {
    const [users, setUsers] = gr.useState([{name: 'dp', username: 'dp', email: 'xyz@gmail.com', address: []}]);
    gr.useEffect(() => {
        // displayUsers((data)=>{
        //     setUsers(data)
        //     console.log("About users mounted",users);
        // });
    })
    let displayUsers = (callbackFromDisplayUsers) => {
        FetchUsers(`https://jsonplaceholder.typicode.com/users`, (data) => {
            callbackFromDisplayUsers(data);
        });
    }
    return (
        <div>
            <h1>About Contents</h1>
            <div>{users.map(x => <div>
                <span>{x.name}</span><span>{x.username}</span><span>{x.email}</span><span>{x.address}</span>
            </div>)}</div>
        </div>
    )
}
const Grid = () => {
    return (
        <div>
            <h1>Grid Contents</h1>
        </div>
    )
}
const QR = () => {
    return (
        <div>
            <h1>QR Contents</h1>
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
