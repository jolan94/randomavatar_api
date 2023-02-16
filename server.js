const express = require('express');
const axios = require('axios');

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/avatar', async (req, res) => {
  try {
    // Fetch a new avatar image from https://thispersondoesnotexist.com/image
    const response = await axios.get('https://thispersondoesnotexist.com/image', { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');
    
    // Set the response headers
    res.set('Content-Type', 'image/jpeg');
    res.set('Content-Length', imageBuffer.length);

    // Send the image as a response
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching avatar image');
  }
});

app.get('/avatarurl', (req, res) => {
  axios({
    method: 'get',
    url: 'https://thispersondoesnotexist.com/image',
    responseType: 'stream'
  })
    .then(function (response) {
      const file_name = uuidv4() + '.jpg'; // Use a random file name if needed
      const stream = fs.createWriteStream(file_name);
      response.data.pipe(stream);
      // const url = `http://localhost:${port}/${file_name}`;
      const url = `https://randomavatar.onrender.com/${file_name}`;
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


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



// const express = require('express');
// const fs = require('fs');
// const axios = require('axios');
// const { v4: uuidv4 } = require('uuid');

// const app = express();
// const port = 3000;



// app.use(express.static(__dirname));

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });
