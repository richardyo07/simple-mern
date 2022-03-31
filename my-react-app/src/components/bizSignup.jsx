/** @format */

import React from 'react';
import PageHeader from './common/pageHeader';
import Joi from 'joi-browser';
// import { toast } from 'react-toastify';
import { apiUrl } from '../config.json';

import Form from './common/form';
import http from '../services/httpService';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import userService from '../services/userService';

class BizSignup extends Form {
  state = {
    data: { email: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(6).label('Password'),
    name: Joi.string().required().min(2).label('Name'),
  };

  doSubmit = async () => {
    const { data } = this.state;
    data.biz = true;

    try {
      await http.post(`${apiUrl}/users`, data);
      await userService.login(data.email, data.password);
      window.location = '/createCard';
      toast('Opened Card Successfully !'); //https://fkhadra.github.io/react-toastify/introduction
    } catch (ex) {
      if (ex.response?.status === 400)
        this.setState({ errors: 'Email is Taken' });
    }
  };
  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container">
        <PageHeader titleText="Business Registration Form" />
        <div className="row">
          <div className="col-12">
            <p>Open Business Card For Free!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="On" method="POST">
              {this.renderInput('email', 'Email', 'email')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderInput('name', 'Name')}
              {this.renderButton('Signup')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BizSignup;
