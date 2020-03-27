(function(){
    const NotFound = () => {
        return (
            <div>
                <h1 className="ui label ribbon">Page Not Found</h1>
                <hr/>
                <a href="/">Home</a>
            </div>
        )
    }

    g_dp_app.extend('NotFound',NotFound);
})();