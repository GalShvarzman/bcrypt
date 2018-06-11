import * as React from 'react';

interface ILoginProps {
    updateField(field, value):void,
    handleLoginSubmit(e):void
}

class Login extends React.Component<ILoginProps, {}>{
    constructor(props:ILoginProps){
        super(props)
    }

    public onChange = (e)=>{
        this.props.updateField(e.target.name, e.target.value)
    };

    render(){
        return(
            <>
                <form onSubmit={this.props.handleLoginSubmit}>
                    <label>Name:</label><input type="name" name="name" onChange={this.onChange}/>
                    <label>Password:</label><input type="password" name="password" onChange={this.onChange}/>
                    <input type="submit" value="submit"/>
                </form>
            </>
        )
    }
}

export default Login;