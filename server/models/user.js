/**
 * Created by sanchitgupta001 on 03/06/18.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0},
});

// Creating 'Model Class' in mongoose
// Note: Here, we are passing 2 arguments to mongoose.model. That means, we are trying to load something into mongoose
mongoose.model('users', userSchema);
