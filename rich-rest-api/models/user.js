/** @format */

const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 70,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  biz: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cards: Array,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, biz: this.biz },
    config.get('jwtKey')
  );
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(70).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    biz: Joi.boolean().required(),
  });
  return schema.validate(data);
}

function validateCards(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(),
  });
  return schema.validate(data);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateCards = validateCards;
