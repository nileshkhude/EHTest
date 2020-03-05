var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  status: Boolean,
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', ContactSchema);
