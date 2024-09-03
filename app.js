const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3030;
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const Task = require('./models/authSchema');

mongoose.connect('mongodb://localhost:27017/ToDoList', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// The Path to the authSchema module 
const authCollection = require('./models/authSchema');

// sets up the ejs path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'alsdkjflasdjflksajdfkasjdxnc,vmznxc,vmnxv',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());  
app.use('/api', userRoutes);

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

    req.session.email = email;
    res.redirect('/home');
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

      req.session.email = email;
      res.redirect('/home');
    });
  } catch (error) {
    res.status(400).send('Error logging in');
  }
});

// Logout a user
app.post('/logout', async (req, res) =>{
  req.session.destroy(err => {
    if(err)
      return res.status(500).send("error logging out");
  })
  res.redirect('/');
});

// Render history page
app.get('/history', (req, res) =>{
  res.render('history', {email: req.session.email});
});

// Render home page
app.get('/home', (req, res) =>{
  res.render('home', {email: req.session.email});
});


// Fetch all tasks for the logged-in user
app.get('/api/tasks', async (req, res) => {
  const email = req.session.email;  // Get the logged-in user's email from the session

  if (!email) {
      return res.status(401).json({ error: 'User not logged in' });
  }

  try {
      const user = await authCollection.findOne({ email: email });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const tasks = user.currentList;  // Assuming `currentList` holds the tasks
      res.json(tasks);
  } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/delete-task/:email/:taskId', async (req, res) => {
    const taskId = req.params.id;

    try {
        // Find and delete the task by its ID
        const result = await Task.currentList.findByIdAndDelete(taskId);

        if (!result) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
