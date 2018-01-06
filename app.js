const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const mm = ['sheen', 'leto', 'franco'];
let i = 0;
mmlen = mm.length;
setInterval(() => {
  i = i < mmlen - 1 ? i + 1 : 0;
  console.log(i + ' ' + mm[i]);
}, 1000);

app.use((req, res, next) => {
  console.log('Request IP:', req.url);
  console.log('Request date:', new Date());
  next();
});

app.use((req, res, next) => {
  const filePath = path.join(__dirname, 'static', `${mm[i]}.png`);
  fs.stat(filePath, (err, fileInfo) => {
    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) {
      res.sendFile(filePath);
      console.log(filePath);
    } else {
      next();
    }
  });
});

app.use((req, res) => {
  res.status(404);
  res.send('file not found');
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});
