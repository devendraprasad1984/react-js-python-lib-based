(function(){
    const NotFound = () => {
        return (
            <div>
                <h1>Page Not Found</h1><br/>
                <h2><a href="/">Home</a></h2>
            </div>
        )
    }

    g_dp_app.extend('NotFound',NotFound);
})();