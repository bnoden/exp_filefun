const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const mm = ['sheen', 'leto', 'franco'];
let i = 0;
let mmlen = mm.length;
setInterval(() => {
  console.log(i + ' ' + mm[i]);
  i = i + 1 < mmlen ? ++i : 0;
}, 1000);

app.use(morgan('short'));

const staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

app.use((req, res) => {
  res.status(404);
  res.send('file not found');
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});
