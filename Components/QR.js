(function(){
    const {gr,qr}=g_dp_app;
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
                <h1 className="ribbon">QR Contents</h1>
                <hr/>
                <div>
                    <button className="btn black" onClick={() => makeCode()}>Generate Code</button>
                    <div><input className="w3-input" type="text" id='qrInputVal' placeholder="enter text here"
                                ref={qrInputVal}/></div>
                    <br/>
                </div>
                <div id='qrdiv' ref={qrdiv}></div>
            </div>
        )
    }

    g_dp_app.extend('QRApp',QRApp);
})()
