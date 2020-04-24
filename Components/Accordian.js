(function () {
    const {gr, forms, fKeys, ts} = g_dp_app;
    const Accordian = ({name, header, counter}) => {
        const [heading, setHeading] = gr.useState(header); //similar to this.setState in class based component
        const [formKeys, setFormKeys] = gr.useState(fKeys);
        let handleChange = (e) => {
            let {name, dataset, value} = e.target;
            let {info} = dataset;
            console.log(name, info, value);
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
                        <span className="nestInput">{cols.map((c, i) => <input name={'ip_' + i + fm}
                                                                               data-info={[fm, rowName, i]}
                                                                               className="text-primary" type="text"
                                                                               defaultValue={c}
                                                                               onChange={(e) => handleChange(e)}/>)}</span>
                    </div>);
                }
            }
            return formElm;
        }

        let handleAccordian = (cnt) => {
            let accs = document.getElementsByClassName("accordion");
            if(cnt>=accs.length)
                return;
            for(let i=0; i<accs.length;i++)
                accs[i].childNodes[0].style.display='none';
            let pnl=accs[cnt].childNodes[0];
             pnl.style.display='block';
        }

        return (
            <div>
                <h1 className="badge grey" style={{width: '100%', textAlign: 'left'}} onClick={()=>handleAccordian(counter)}><span
                    className="badge green">{counter + 1} - {heading}</span></h1>
                <div className="ui form accordion">
                    <div className="box panel">
                        {getFormDetails(counter.toString())}
                        <button className="btn blue" onClick={() => what2save()}>Save</button>
                        {
                            counter+1<forms.names.length
                            ? <button className="btn black"  onClick={()=>handleAccordian(counter+1)}>Next</button>
                            : <button className="btn red"  onClick={()=>handleAccordian(counter+1)}>Submit</button>
                        }
                    </div>
                    <br/>
                </div>
            </div>
        )
    }

    g_dp_app.extend('Accordian', Accordian);

})();

