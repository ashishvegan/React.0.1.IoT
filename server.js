const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;
const cors = require('cors');
app.use(bodyParser.json());

app.post('/api/save', (req, res) => {
  const data = req.body.data;

  fs.writeFile('file.txt', data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ message: 'Error writing to file' });
    } else {
      console.log('Data saved to file.txt:', data);
      res.json({ message: 'Data saved successfully.' });
    }
  });
});

// Serve the read.html file
app.get('/read', (req, res) => {
    res.sendFile(path.join(__dirname, 'read.html'));
  });
  
  // Endpoint to read the file contents
  app.get('/api/read', (req, res) => {
    // Replace 'file.txt' with the name of the file you want to read
    const filePath = path.join(__dirname, 'file.txt');
  
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ message: 'Error reading file' });
      } else {
        res.send(data);
      }
    });
  });

app.use(cors());
app.listen(port, () => {
  console.log(`Server is running on http://192.168.183.79:${port}`);
});

