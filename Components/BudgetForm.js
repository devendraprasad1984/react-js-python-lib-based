const DisplayBudgetForms = () => forms.names.map((x, id) => <div><Accordian counter={id} header={x}/></div>);

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
