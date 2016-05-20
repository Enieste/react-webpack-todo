'use strict';

import React from 'react';
import { Link } from 'react-router';
import apiTools from '../apiTools';
//import ee from '../services/sessionService';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
};

let HomePage = React.createClass({
    getInitialState() {
        return {};
    },
    componentWillMount() {
        apiTools.auth.session().then(res => {
            this.props.dispatch({
                type: 'SIGN_IN',
                user: res
            })
        });
        //ee.addListener('signIn', () => {
        //    fetchUser();
        //});
        //fetchUser();
        //ee.addListener('signUp', () => {
        //    fetchUser();
        //})
    },
    handleSignOut() {
        apiTools.auth.signOut().then(() => {
            this.props.dispatch({
                type: 'SIGN_OUT'
            })
        }).then(() => apiTools.todos.list()).then((res) => this.props.dispatch({
          type: 'LOAD_TODOS',
          todos: res
        })).catch((e) => console.warn(e));
    },
    render() {
        return (
        <div>
            {this.props.user ? <div><h2>Hello, {this.props.user.login}!</h2>
            <button onClick={this.handleSignOut} className='btn btn-warning'>Sign out</button></div>
            : <h2>Hey, guest!</h2>}
            <h2>What do you want TO DO?</h2>
            <ul>
                {!this.props.user ? <li><Link to="/signIn">Sign in</Link></li> : false}
                {!this.props.user ? <li><Link to="/signUp">Sign up</Link></li> : false}
                <li><Link to="/todo">TODO list</Link></li>
            </ul>
            {this.props.children}
        </div>
        )
    }
});

HomePage = connect(mapStateToProps)(HomePage);

export default HomePage;

