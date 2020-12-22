const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/../dist/skaner-frontend'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/../dist/skaner-frontend/index.html'));
});

app.listen(8080, () => console.log(`Front is being served!`));
