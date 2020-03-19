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
const grdom = window.ReactDOM;
const groute = window.ReactRouter;
const groutedom = window.ReactRouterDOM;

let forms = {
    names: ['Project Details', 'Capex/Revx', 'Costs', 'Benefits'],
    0: [{rowName: 'Net Interest Income', cols: [0, 0, 0, 0, 0]}, {rowName: 'Input values for ledger', cols: [0, 0, 0, 0, 0, 0, 0]}, {
        rowName: 'Gross Income Budget',
        cols: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }],
    1: [{rowName: 'ABC', cols: [0, 0, 0, 0, 0, 0, 0, 0, 0]}, {rowName: 'XYZ', cols: [0, 0, 0, 0, 0]}, {
        rowName: 'WHAT A LINE',
        cols: [0, 0, 0, 0, 0]
    }],
    2: [{rowName: 'ABC', cols: [0, 0, 0, 0, 0, 0, 0]}, {rowName: 'XYZ', cols: [0, 0, 0, 0, 0]}, {
        rowName: 'WHAT A LINE',
        cols: [0, 0, 0, 0, 0]
    }],
    3: [{rowName: 'ABC', cols: [0, 0, 0, 0, 0]}, {rowName: 'XYZ', cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}, {
        rowName: 'WHAT A LINE',
        cols: [0, 0, 0, 0, 0]
    }]
}
let fKeys = Object.keys(forms);

function EnhanceComponent(ComponentToEnhance) {
    ComponentToEnhance.prototype.componentWillReceiveProps = function (nextProps) {
        console.log('Current props: ', this.props);
        console.log('Next props: ', nextProps);
    };
    //this is an example of decorative design pattern and composite design pattern
    return class extends React.Component {
        render() {
            const extraProp = {msg: 'This is an injected prop!', age: 40};
            return (
                <div>
                    <ComponentToEnhance {...this.props} extraProp={extraProp}/>
                </div>
            );
        }
    }
}

//stateless functional component and no need to use bind(this) and is easy
const setRouting = () => {
    let router = groute.Router;
    let route = groute.Route;
    let rElm = <router>
        <div>
            <route render={() => <App/>} path="/"/>
        </div>
    </router>
    return rElm;
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
                formElm.push(<form><div className="customInputText"><span className="text-primary xlable">{rowName}</span> <span
                    className="nestInput">{cols.map(c => <input className="text-primary" type="text" value="0"/>)}</span>
                </div></form>)
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

const displayForms = () => {
    return forms.names.map((x, id) => <div><Accordian counter={id} header={x}/></div>);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {liked: false, name: this.props.name};
        // this.displayForms = this.displayForms.bind(this); //binding is needed so as this is undefined error doesnt come
    }

    //with every setupdate the entire virtualdom vdom component rerenders
    // this.setState({ value: this.state.value + 1 }); //wrong way to update states as its async and can be called multiple times and stacks error
    // this.setState(prevState => ({ value: prevState.value + 1 })); //this is the right way
    // this.setState(({ value }) => ({ value: value + 1 })); //alternatively //this is destructuring syntax
    // from external

    render() {
        return (
            <div>
                <h1 className="bg-success text-white" style={{padding: '5px'}}>{this.props.title}</h1>
                {this.props.callback()}
            </div>
        );
    }
}

// ReactDOM.render(e(ReactDiv1Component), document.querySelector('#reactDiv1'));
ReactDOM.render(<App title={'Budget Input Form'} name="global page heading"
                     callback={displayForms}/>, document.getElementById('root'));
// let icomp1=<ReactDiv2Component age='20'/>;
// ReactDOM.render(icomp1, document.getElementById('reactDiv2'));
// ReactDOM.render(<ReactDiv3Component/>, document.getElementById('reactDiv3'));
