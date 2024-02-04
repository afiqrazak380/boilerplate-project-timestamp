// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// An empty date parameter should return the current time in a JSON object with a unix key
// An empty date parameter should return the current time in a JSON object with a utc key
app.get('/api', (req, res) => {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

// listen for requests :)
var listener = app.listen(3001, function () {
  console.log('Your app is listening on port ' + 3001);
});

//A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
app.get('/api/:timestamp', (req, res) => {
  const timestamp = req.params.timestamp;

  // Check if timestamp is a valid Unix timestamp
  if (!isNaN(Number(timestamp)) && timestamp.length === 13) {
    // Define a variable and convert timestamp string to number
    const unixTimestamp = Number(timestamp);
    return res.json({
      unix: unixTimestamp,
      utc: new Date(unixTimestamp).toUTCString(),
    });
  }

  // Check if the timestamp is a valid date string
  if (new Date(timestamp).toUTCString() !== 'Invalid Date') {
    return res.json({
      unix: new Date(timestamp).getTime(),
      utc: new Date(timestamp).toUTCString(),
    });
  }

  // If timestamp is not valid
  res.json({ error: 'Invalid Date' });
});

// If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
