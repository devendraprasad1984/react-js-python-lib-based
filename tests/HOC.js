function EnhanceComponent(ComponentToEnhance) {
    ComponentToEnhance.prototype.componentWillReceiveProps = function (nextProps) {
        console.log('Current props: ', this.props);
        console.log('Next props: ', nextProps);
    };
    //this is an example of decorative design pattern and composite design pattern
    return class extends React.Component {
        render() {
            const extraProp = {msg: 'This is an injected prop!', age: 40};
            return (
                <div>
                    <ComponentToEnhance {...this.props} extraProp={extraProp}/>
                </div>
            );
        }
    }
}
