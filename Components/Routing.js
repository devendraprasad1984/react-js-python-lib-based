//stateless functional component and no need to use bind(this) and is easy
(function () {
    const {HashRouter, Switch, Route, Router, Link} = g_dp_app.gdom;
    const {linksArr} = g_dp_app;
    const iconNames = linksArr;

    const handleActive=(e)=>{
        let navLinks=Object.values(document.getElementsByClassName('sidenav')[0].children);
        navLinks.map(x=>x.className='');
        let cur=e.target;
        cur.className='active';
    }
    const nav = (curIndex) => {
        return (<div>
            <div className="bg-dark sidenav">
                {iconNames.map((x,i)=><Link to={x} className={i===curIndex?'active':''} onClick={(e)=>{handleActive(e)}}>{x==='/'?'Home':x.replace('/','')}</Link>)}
            </div>
            {/*{props.children}*/}
        </div>)
    };
    const setRouting = () => {
        const {Home, Budget, About, Grid, QRApp, NotFound, DisplayBudgetForms, PDF_CSV} = g_dp_app;
        const iconNames = linksArr;
        let curLink = window.location.hash.replace('#', '');
        let curIndex = iconNames.map(y => y.indexOf(curLink) !== -1).indexOf(true);
        return <HashRouter>
            <div className="rightContainer">
                {nav(curIndex)}
                <Switch>
                    <Route exact path={iconNames[0]}><Home/></Route>
                    <Route path={iconNames[1]}><Budget title={'Budget Input Form'}
                                                       callback={DisplayBudgetForms}/></Route>
                    <Route path={iconNames[2]}><About/></Route>
                    <Route path={iconNames[3]}><Grid/></Route>
                    <Route path={iconNames[4]}><QRApp/></Route>
                    <Route path={iconNames[5]}><PDF_CSV/></Route>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
        </HashRouter>
    }

    const setRouting_NA = () => {
        const {Home, Budget, About, Grid, QRApp, NotFound, DisplayBudgetForms, PDF_CSV} = g_dp_app;
        return (
            <div className="rightContainer">
                <Router>
                    <Route path={iconNames[0]} component={nav}>
                        <Route path={iconNames[1]}><Budget title={'Budget Input Form'}
                                                           callback={DisplayBudgetForms}/></Route>
                        <Route path={iconNames[2]} component={About}/>
                        <Route path={iconNames[3]} component={Grid}/>
                        <Route path={iconNames[4]} component={QRApp}/>
                        <Route path={iconNames[5]} component={PDF_CSV}/>
                        <Route path="*" component={NotFound}/>
                    </Route>
                </Router>
            </div>
        )
    }

    g_dp_app.extend('setRouting', setRouting)
})()
