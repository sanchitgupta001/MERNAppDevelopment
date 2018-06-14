/**
 * Created by sanchitgupta001 on 12/06/18.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0},
  no: { type: Number, default: 0},
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // ref: denotes reference to 'User' collection, '_' denotes that the field is a relationship field between this model and another one
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model('surveys', surveySchema);
