import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import {connect} from 'react-redux';
import {loginUser} from "../../store/actions/authActions";
class Login extends Component {
    state={
        email:'',
        password:'',
        errors:{}
    };

    onChangeHandler = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    };
    onSubmitHandler= (e)=>{
        e.preventDefault();
        const newUser={
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(newUser);



    };

    componentDidMount() {

        if(this.props.auth.isAuthenticated)
        {
            this.props.history.push('/boards');}
    }


    componentWillReceiveProps(nextProps) {

            if(nextProps.auth.isAuthenticated)
            {
                this.props.history.push('/boards');
            }

            if(nextProps.errors){
                this.setState({errors:this.props.errors});
            }


    }
    render() {
        const {errors}=this.state;
        return (
            <div className={"register"}>
                <h3 className={"register__title"}>Login</h3>

                <form noValidate onSubmit={this.onSubmitHandler}>


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

                    <button className={"register__Button"} >Log In</button>

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
export default connect(mapStateToProps,{loginUser})(Login);