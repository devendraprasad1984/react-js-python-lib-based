(function () {
    const {forms, Accordian, ts, Modal,gr} = g_dp_app;

    const DisplayBudgetForms = () => forms.names.map((x, id) => <div><Accordian counter={id} header={x}/></div>);
    const Budget = ({title, callback}) => {
        const [modalShow, setModalShow] = gr.useState(false);
        // const [formData,setFormData]=gr.useState({});
        let submitBudget = () => {
            let textElms = document.getElementsByClassName('xinput');
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
            ts.success('check console, form data object has been generated, send this to server using fetch post command and handle response');
            ts.error('contact admin');
        }
        // gr.useEffect(()=>{
        //    console.log(formData);
        // },[])
        return (
            <div>
                <h1 className="ribbon">{title}</h1>
                <div>
                    <button className="btn black" onClick={() => submitBudget()}>Submit</button>
                    <button className="btn red" onClick={() => ts.info('resetting, ok!')}>Reset</button>
                    <button className="btn yellow" onClick={() => {setModalShow(true);}}>Instruction</button>
                </div>
                <div>
                    <Modal show={modalShow} contents={'hi there'} title={'Ok! read instruction carefully'} close={() => {
                        setModalShow(false);
                    }} ok={()=>{ts.success('Ok we are sure, you have read');}}/>
                </div>
                {callback()}
            </div>
        );
    }

    g_dp_app.extend('DisplayBudgetForms', DisplayBudgetForms);
    g_dp_app.extend('Budget', Budget);

})();

