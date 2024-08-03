const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ToDoList', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Update the path to the authSchema module
const authCollection = require('./models/authSchema');

// Middleware to serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the index.html file from the root of the project
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
});

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new authCollection({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: 'Error registering user' });
  }
});

// Login a user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt with:', { email, password });

    const user = await authCollection.findOne({email});
    console.log('User found:', user);
    if (!user)
      return res.status(404).send('User not found');
    
    user.comparePassword(password, (err, isMatch) => {
      if (err) 
        return res.status(500).send('Error comparing passwords');
      if (!isMatch) return res.status(401).send('Invalid password');
      res.status(200).send('Login successful');
    });
  } catch (error) {
    res.status(400).send('Error logging in');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
