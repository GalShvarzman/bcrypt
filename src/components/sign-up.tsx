import * as React from 'react';

interface ISignUpProps {
    updateField(field, value):void,
    handleSignUpSubmit(e):void
}

interface ISignUpState {

}

class SignUp extends React.Component<ISignUpProps,ISignUpState>{
    constructor(props:ISignUpProps){
        super(props)
    }

    public onChange = (e)=>{
        this.props.updateField(e.target.name, e.target.value)
    };

    render(){
        return(
            <>
                <form onSubmit={this.props.handleSignUpSubmit}>
                    <label>Name:</label><input type="name" name="name" onChange={this.onChange}/>
                    <label>Password:</label><input type="password" name="password" onChange={this.onChange}/>
                    <input type="submit" value="submit"/>
                </form>
            </>
        )
    }

}

export default SignUp;