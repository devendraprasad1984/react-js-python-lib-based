(function () {
    const {gr, forms, fKeys,ts} = g_dp_app;
    const Accordian = ({name, header, counter}) => {
        const [heading, setHeading] = gr.useState(header); //similar to this.setState in class based component
        const [formKeys, setFormKeys] = gr.useState(fKeys);
        let handleChange=(e)=>{
            let {name,dataset,value}=e.target;
            let {info}=dataset;
            console.log(name,info,value);
        }
        let what2save = () => {
            ts.info('check console, saved');
        }

        let getFormDetails = (keyid) => {
            let formElm = []
            if (formKeys.indexOf(keyid) !== -1) {
                //found in forms Array
                let formX = forms[keyid];
                for (let fm in formX) {
                    let {rowName, cols} = formX[fm];
                    formElm.push(<div className="xinput">
                        <span>{rowName}</span>
                        <span className="nestInput">{cols.map((c,i) => <input name={'ip_'+i+fm} data-info={[fm,rowName,i]} className="text-primary" type="text"
                                                                          defaultValue={c} onChange={(e)=>handleChange(e)}/>)}</span>
                    </div>);
                }
            }
            return formElm;
        }
        return (
            <div>
                <h1 className="badge grey" style={{width: '100%', textAlign: 'left'}}><span
                    className="badge green">{counter + 1} - {heading}</span></h1>
                <div className="ui form">
                    <div className="box">
                        {getFormDetails(counter.toString())}
                        <button className="btn primary" onClick={() => what2save()}>Save</button>
                        <button className="btn black">Next</button>
                    </div>
                    <br/>
                </div>
            </div>
        )
    }

    g_dp_app.extend('Accordian', Accordian);

})();

