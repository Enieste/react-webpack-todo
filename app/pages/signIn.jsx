'use strict';

import React from 'react';
import apiTools from '../apiTools.js';
//import ee from '../services/sessionService';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

let SignIn = React.createClass({
    getInitialState() {
        return {login: '', password: ''};
    },
    //contextTypes: {
    //  router: React.PropTypes.object
    //},
    onLoginChange(e) {
        this.setState ({
            login: e.target.value
        });
    },
    onPasswordChange(e) {
        this.setState ({
            password: e.target.value
      });
    },
    handleSignIn(e) {
        e.preventDefault();
        apiTools.auth.signIn(this.state.login, this.state.password).then(res => {
            this.props.dispatch(replace('/'));
            //this.context.router.replace('/'); // todo move to reducers
            //ee.emitEvent('signIn');
            this.props.dispatch({
                type: 'SIGN_IN',
                user: res
            })
        });
    },
    render() {
        return (
            <div className="sign-in-form">
                <form onSubmit={this.handleSignIn} className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="inputLogin" className="col-sm-2 control-label">Login</label>
                        <div className="col-sm-10">
                            <input type="login" className="form-control" placeholder="Your Login"
                                   onChange={this.onLoginChange} value={this.state.login}/>
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
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});

SignIn = connect()(SignIn);

export default SignIn;