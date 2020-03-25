//stateless functional component and no need to use bind(this) and is easy
const setRouting = () => {
    return <HashRouter>
        <div className="bg-info sidenav">
            <Link to="/">Home</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/about">About</Link>
            <Link to="/grid">Grid</Link>
            <Link to="/qr">QR</Link>
        </div>
        <div className="rightContainer">
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route path="/budget"><Budget title={'Budget Input Form'} callback={DisplayBudgetForms}/></Route>
                <Route path="/about"><About/></Route>
                <Route path="/grid"><Grid/></Route>
                <Route path="/qr"><QRApp/></Route>
                <Route path="*" component={NotFound}/>
            </Switch>
        </div>
    </HashRouter>
}