(function(){
    const NotFound = () => {
        return (
            <div>
                <h1 className="ribbon">Page Not Found</h1>
                <a href="/">Home</a>
            </div>
        )
    }

    g_dp_app.extend('NotFound',NotFound);
})();