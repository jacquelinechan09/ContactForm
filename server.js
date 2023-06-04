const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contacts', (req, res) => {
  Contact.find({}, (err, contacts) => {
    if (err) {
      console.log('Error retrieving contacts from MongoDB:', err);
      res.sendStatus(500);
    } else {
      res.render('contacts', { contacts });
    }
  });
});

// Define MongoDB Schema and Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    message,
  });

  newContact.save()
    .then(() => {
      console.log('Contact saved to MongoDB');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error saving contact to MongoDB:', error);
      res.sendStatus(500);
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
