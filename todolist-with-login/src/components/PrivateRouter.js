import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component : Component, login, ...rest }) => (
  <Route
    {...rest}
    render={ props => console.log(props) ||
      login.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(PrivateRoute)