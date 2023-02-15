const express = require('express');
const fs = require('fs');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  axios({
    method: 'get',
    url: 'https://thispersondoesnotexist.com/image',
    responseType: 'stream'
  })
    .then(function (response) {
      const file_name = uuidv4() + '.jpg'; // Use a random file name if needed
      const stream = fs.createWriteStream(file_name);
      response.data.pipe(stream);
      const url = `http://localhost:${port}/${file_name}`;
      console.log(url); // Print the URL to console
      // res.send(`Avatar URL printed to console ${url}`);
      res.send(url);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send('Error generating avatar');
    });
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
