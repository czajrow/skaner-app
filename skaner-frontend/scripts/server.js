//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/../dist/skaner-frontend'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/../dist/skaner-frontend/index.html'));
});

app.listen(8080);
