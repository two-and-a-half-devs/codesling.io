import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Input from '../globals/forms/Input';
import Button from '../globals/Button/';

import './Auth.scss';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      password,
    } = this.state;
    const { data } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/users/auth`, {
      username,
      password,
    });
    const { accessToken } = data;
    localStorage.setItem('token', accessToken);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="login-form-container">
        <form
          className="auth-form"
          onSubmit={this.handleLoginSubmit}
        >
          <h2>Login</h2>
          <p>
            Don't have an account?
            <span className="auth-link">
              <Link to="/auth/signup">
                Sign up
              </Link>
            </span>
          </p>
          <Input
            type="text"
            name="username"
            placeholder="username"
            onChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <Button
            backgroundColor="red"
            color="white"
            text="Log In"
            onClick={this.loginClick}
          />
        </form>
      </div>
    );
  }
}

export default Login;
