import * as React from 'react';
import './App.css';
import {appStore} from "./appStore";
import {appService} from "./appService";
import * as classNames from "classnames";
import { Link, Switch, Route } from 'react-router-dom';
import SignUp from "./components/sign-up";
import Login from "./components/login";

interface IUser{
    name:string,
    password:string
}

interface IAppState {
    user:IUser
}

class App extends React.Component<{}, IAppState> {
    constructor(props:{}) {
        super(props);
        this.state = {user:{name:"", password:""}};

        appService.setRootComponent(this);
    }

    public updateField = (field, value)=>{
        this.setState((prevState)=>{
            return{
                user:{
                    ...this.state.user,
                    [field] : value
                }
            }
        })
    };

    public handleSignUpSubmit = async (e)=>{
        e.preventDefault();
        const data = await appService.signUp(this.state.user);
        if(data.message) alert(data.message);
    };

    public handleLoginSubmit = async (e)=>{
        e.preventDefault();
        const message = await appService.login(this.state.user);
        if(message.status === "OK"){
            alert("you are logged in");
        }
        else{
           alert("username or password are incorrect");
        }
    };

    public contactsRender= ()=>{
        const {loading} = appStore;
        let {updatingContactName} = appStore;
        const errorMessage = (appStore.error && appStore.error.message) || "";

        if(!updatingContactName){
            updatingContactName = "";
        }
        return(
        <>
        <h1>Manage Contacts</h1>

        <h2 className="error">{errorMessage}</h2>

        <div className={classNames("loading", {active: loading})}>
            Loading ...
        </div>

        <ul>{this.getContactsLIs()}</ul>

        <div className="edit-zone">
            <input value={updatingContactName} onChange={(event)=>appService.updatingContactNameChanged(event.target.value)} />
            <button onClick={() => appService.save()}>Save</button>
        </div>
    </>)
    };

    public sigUpRender = ()=>(<SignUp handleSignUpSubmit={this.handleSignUpSubmit} updateField={this.updateField}/>);

    public loginRender = () => (<Login updateField={this.updateField} handleLoginSubmit={this.handleLoginSubmit}/>);

    public render() {
        console.log("render");
        return (
            <div className="App">
                <Link to='/sign-up'><button>sign-up</button></Link>
                <Link to='/login'><button>login</button></Link>
                <Switch>
                    <Route exact={true} path='/sign-up' render={this.sigUpRender}/>
                    <Route exact={true} path='/login' render={this.loginRender}/>
                    <Route exact={true} path='/' render={this.contactsRender}/>
                </Switch>
            </div>
        );
    }

    getContactsLIs(): any {
        const {contacts} = appStore;
        if (!contacts) {
            return;
        }

        return contacts.map(c => (
            <li key={c.id}>
                <span className='name'>{c.name}</span>
                <button onClick={() => appService.select(c)}>Select</button>
            </li>)
        )
    }
}

export default App;
