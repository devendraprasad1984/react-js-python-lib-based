(function () {
    const Modal = ({title, contents, show, ok, close}) => {
        return <div style={{display: (show ? 'inline-block' : 'none')}} className='overlay'>
            <div className='overlay-content'>
                <h1>{title}</h1>
                <div>{contents}</div>
            </div>
            <div className='button-row'>
                <button className='btn grey' onClick={ok}>Ok</button>
                <button className='btn red' onClick={close}>Cancel</button>
            </div>
        </div>
    }
    g_dp_app.extend('Modal', Modal);
})();