import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerUser} from "../../store/actions/authActions";
import {Link} from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";

class Register extends Component {
    state={
        email:'',
        login:'',
        firstname:'',
        lastname:'',
        password:'',
        password2:'',
        errors:{}
    };
    onChangeHandler = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    };
    onSubmitHandler= (e)=>{
        e.preventDefault();
        const newUser={
            firstname:this.state.firstname,
            login:this.state.login,
            lastname:this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);



    };

    componentDidUpdate(prevProps, prevState) {
        if(this.props!==prevProps){
            this.setState({errors:this.props.errors});

        }
    }


    render() {
        const {errors}=this.state;

        return (
            <div className={"register"}>
                <h3 className={"register__title"}>Create  Account</h3>

                <form noValidate onSubmit={this.onSubmitHandler}>

                    <TextFieldGroup
                    placeholder={"firstname"}
                    type={"text"}
                    name={"firstname"}
                    value={this.state.name}
                    onChange={this.onChangeHandler}
                    error={errors.name}
                    label={"Firstname"}
                    />
                    <TextFieldGroup
                        placeholder={"lastname"}
                        type={"text"}
                        name={"lastname"}
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        error={errors.name}
                        label={"Lastname"}
                    />
                    <TextFieldGroup
                        placeholder={"login"}
                        type={"text"}
                        name={"login"}
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        error={errors.name}
                        label={"Login"}
                    />
                    <TextFieldGroup
                        placeholder={"email"}
                        name={"email"}
                        type={"email"}
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        error={errors.email}
                        label={"Email"}
                    />
                    <TextFieldGroup
                        placeholder="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        error={errors.password}
                        label={"Password"}
                    />
                    <TextFieldGroup
                        placeholder="Confirm Password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChangeHandler}
                        error={errors.password2}
                        label={"Confirm your password"}
                    />
                    <button className={"register__Button"}>Create New Account</button>

                </form>
                {errors.message?<p>{errors.message}</p>:null}

            </div>
        );
    }
}

const mapStateToProps = (state)=>{
return {
    auth:state.auth,
    errors:state.errors
} 
};

export default connect(mapStateToProps,{registerUser})(Register);