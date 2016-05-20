'use strict';

import React from 'react';
import apiTools from '../apiTools.js';
//import ee from '../services/sessionService';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

let SignUp = React.createClass({
    getInitialState() {
        return {login: '', email: '', password: '', passwordConfirm: ''};
    },
    //contextTypes: {
    //    router: React.PropTypes.object
    //},
    onLoginChange(e) {
        this.setState ({
            login: e.target.value
        });
    },
    onEmailChange(e) {
        this.setState ({
            email: e.target.value
        });
    },
    onPasswordChange(e) {
        this.setState ({
            password: e.target.value
        });
    },
    onConfirmChange(e) {
        this.setState ({
            passwordConfirm: e.target.value
        })
    },
    handleSignUp(e) {
        e.preventDefault();
        if (this.state.password === this.state.passwordConfirm) {
            apiTools.auth.signUp(this.state.login, this.state.email, this.state.password).then(res => {
                this.props.dispatch(replace('/'));
                this.props.dispatch({
                    type: 'SIGN_IN',
                    user: res
                });
                //this.context.router.replace('/');
                //ee.emitEvent('signUp');
            });
        } else {
            this.setState ({error: "Passwords don't match"})
        }
    },
    render() {
        return <div className="sign-up-form">
            <form onSubmit={this.handleSignUp} className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="inputLogin" className="col-sm-2 control-label">Login</label>
                    <div className="col-sm-10">
                        <input type="login" className="form-control" placeholder="Your Login"
                               onChange={this.onLoginChange} value={this.state.login}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail" className="col-sm-2 control-label">E-mail</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" placeholder="Your E-mail"
                               onChange={this.onEmailChange} value={this.state.email}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Your Password"
                               onChange={this.onPasswordChange} value={this.state.password}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPasswordConfirm" className="col-sm-2 control-label">Password Confirm</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Repeat Your Password"
                               onChange={this.onConfirmChange} value={this.state.passwordConfirm}/>
                    </div>
                </div>
                {this.state.error ? <div className='error-message'>{this.state.error}</div> : false}
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    }
});

SignUp = connect()(SignUp);

export default SignUp;