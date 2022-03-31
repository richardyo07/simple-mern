/** @format */

const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const _ = require('lodash');

const cardSchema = new mongoose.Schema({
  bizName: { type: String, minlength: 2, maxlength: 255, required: true },
  bizDescription: {
    type: String,
    minlength: 2,
    maxlength: 1024,
    required: true,
  },
  bizAddress: { type: String, minlength: 2, maxlength: 400, required: true },
  bizPhone: { type: String, minlength: 9, maxlength: 10, required: true },
  bizImage: { type: String, minlength: 11, maxlength: 1024, required: true },
  bizNumber: {
    type: String,
    minlength: 3,
    maxlength: 9,
    required: true,
    unique: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1050).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .regex(/^0[2-9]\d{7,8}$/)
      .required(),
    bizImage: Joi.string().min(11).max(1049),
  });
  return schema.validate(card);
}

async function genBizNum() {
  while (true) {
    let randomNum = _.random(1000, 999999);
    let card = await Card.findOne({ bizNumber: randomNum });
    if (!card) return String(randomNum);
  }
}

exports.Card = Card;
exports.validateCard = validateCard;
exports.genBizNum = genBizNum;
