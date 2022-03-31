/** @format */

import React from 'react';
import Form from './common/form';
import PageHeader from './common/pageHeader';
import Joi from 'joi-browser';
import cardService from '../services/cardService';
import { toast } from 'react-toastify';

class CreateCard extends Form {
  state = {
    data: {
      bizName: '',
      bizDescription: '',
      bizAddress: '',
      bizPhone: '',
      bizImage: '',
    },
    errors: {},
  };

  schema = {
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024).uri().allow(''),
  };

  doSubmit = async () => {
    const { data } = this.state;
    if (!data.bizImage) delete data.bizImage;
    await cardService.createCard(this.state.data);
    toast('A new card was created!');
    this.props.history.replace('/myCards');
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Business Registration Form" />
        <div className="row">
          <div className="col-12">
            <p>Open Business Card</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="on" method="POST">
              {this.renderInput('bizName', 'Business Name')}
              {this.renderInput('bizPhone', 'Business Phone')}
              {this.renderInput('bizAddress', 'Business Adress')}
              {this.renderInput('bizImage', 'Business Image')}
              {this.renderInput('bizDescription', 'Business Description')}
              {this.renderButton('Create Card')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateCard;
