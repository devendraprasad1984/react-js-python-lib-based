(function () {
    const {gr,forms,fKeys}=g_dp_app;
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

    g_dp_app.extend('Accordian',Accordian);

})();
