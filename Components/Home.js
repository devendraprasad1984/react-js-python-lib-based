
const Home = () => {
    const mform = gr.useRef(null);
    let handleSubmit = (e) => {
        console.log(mform.current, mform.current.childNodes);
        e.preventDefault();
    }
    return (
        <div>
            <h1>Home Contents</h1>
            <div>
                <span className="badge bg-danger text-white">HTML5+ReactJs+Babel+CSS+Vanila JS</span>
            </div>
            <h2>testing a way of handling input form</h2>
            <form ref={mform} onSubmit={e => handleSubmit(e)}>
                <input type="text"/>
                <input type="submit" value="Submit" className="btn bg-warning"/>
            </form>
        </div>
    )
}
