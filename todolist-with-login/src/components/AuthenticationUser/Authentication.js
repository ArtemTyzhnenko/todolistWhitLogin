import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {withRouter} from 'react-router-dom';
import localStorageApi from '../../services/localStorageApi.js'

import {
  authenticationSuccess,
  authenticationFail
} from '../../modules/login/actions'

class Authentication extends Component {

  state = {
    login:'',
    password: '',
  };
  
  componentDidMount() {
    localStorageApi.clear();
  };
  
  onChange = (name) => (e) => this.setState({[name]: e.target.value});

  onSingInClick = (e) => {
    e.preventDefault();
    const {actions} = this.props;
    const {login, password} = this.state;
    if(!!login.trim() && !!password.trim()){
      const userId = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      actions.authenticationSuccess(login,password, userId);
      localStorageApi.add('user', {login,password, userId});
      this.props.history.push("/todolist");
    }else{
      actions.authenticationFail();
      !!login ? alert('Password must be filled') : alert('Login must be filled');
    }
  };
  
  render() {
    return (
      <div>
        <form onSubmit={this.onSingInClick}>
          <input type="text" onChange = {this.onChange('login')}/>
          <input type="password" onChange = {this.onChange('password')}/>
          <button type="submit">Sing in</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        authenticationSuccess,
        authenticationFail,
      },
      dispatch,
    ),
  };
};

const mapStateToProps = state => {
  return {
    login: state.login,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authentication));