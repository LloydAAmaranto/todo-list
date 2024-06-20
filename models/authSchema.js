const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ToDoList')
.then(()=>{
  console.log('mongoose connection success');
})
.catch((e)=>{
  console.log('mongoose connection failed');
})

const authSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const authCollection = new mongoose.model('User', authSchema);
module.exports = authCollection;
