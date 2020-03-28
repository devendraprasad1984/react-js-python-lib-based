//stateless functional component and no need to use bind(this) and is easy
(function () {
    const {HashRouter, Switch, Route, Link} = g_dp_app.gdom;

    const setRouting = () => {
        const {Home, Budget, About, Grid, QRApp, NotFound, DisplayBudgetForms, PDF_CSV} = g_dp_app;
        return <HashRouter>
            <div className="bg-dark sidenav">
                <Link to="/">Home</Link>
                <Link to="/budget" >Budget</Link>
                <Link to="/about" >About</Link>
                <Link to="/grid" >Grid</Link>
                <Link to="/qr" >QR</Link>
                <Link to="/pdf_csv" >PDF-CSV</Link>
            </div>
            <div className="rightContainer">
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/budget"><Budget title={'Budget Input Form'} callback={DisplayBudgetForms}/></Route>
                    <Route path="/about"><About/></Route>
                    <Route path="/grid"><Grid/></Route>
                    <Route path="/qr"><QRApp/></Route>
                    <Route path="/pdf_csv"><PDF_CSV/></Route>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
        </HashRouter>
    }

    g_dp_app.extend('setRouting', setRouting)
})()
