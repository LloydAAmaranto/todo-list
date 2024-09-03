const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  currentList: [
    {
      id: { type: String, required: true }, // Unique identifier 
      task: { type: String, required: true } // The actual task 
    }
  ],
  historyList: [
    {
      id: { type: String, required: true }, // Unique identifier
      task: { type: String, required: true } // The actual task
    }
  ]
});

// Hash the password before saving the user
authSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// Method to compare passwords
authSchema.methods.comparePassword = function(enteredPassword, cb) {
  bcrypt.compare(enteredPassword, this.password, cb);
};

const authCollection = mongoose.model('Auth', authSchema);
module.exports = authCollection;
