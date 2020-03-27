//stateless functional component and no need to use bind(this) and is easy
(function(){
    const {HashRouter, Switch, Route, Link}=g_dp_app.gdom;

    const setRouting = () => {
        const {Home,Budget,About,Grid,QRApp,NotFound,DisplayBudgetForms,PDF_CSV}=g_dp_app;
        return <HashRouter>
            <div className="ui left visible vertical sidebar labeled icon menu">
                <Link to="/" className="item">Home</Link>
                <Link to="/budget" className="item">Budget</Link>
                <Link to="/about" className="item">About</Link>
                <Link to="/grid" className="item">Grid</Link>
                <Link to="/qr" className="item">QR</Link>
                <Link to="/pdf_csv" className="item">PDF-CSV</Link>
            </div>
            <div className="rightContainer">
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/budget"><Budget title={'Budget Input Form'} callback={DisplayBudgetForms}/></Route>
                    <Route path="/about"><About /></Route>
                    <Route path="/grid"><Grid /></Route>
                    <Route path="/qr"><QRApp /></Route>
                    <Route path="/pdf_csv"><PDF_CSV /></Route>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
        </HashRouter>
    }

    g_dp_app.extend('setRouting', setRouting)
})()
