const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios').default;
require('dotenv').config();

const port = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.post('/message', (req, res) => {
  const { message } = req.body;

  axios
    .post(WEBHOOK_URL, {
      content: `<@&651412869606277140> ${message}`,
    })
    .then((response) => {
      console.log(response);
      res
        .status(200)
        .json({ status: 200, message: 'Message successfully sent!' });
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: error });
    });
});

app.post('/paid', (req, res) => {
  const unpaidPlayers = req.body.join(', ');
  console.log('Players who have not paid: ', unpaidPlayers);

  axios
    .post(WEBHOOK_URL, {
      content: `<@&651412869606277140> Pelaajat jotka eivät ole maksaneet Realmsista tässä kuussa: ${unpaidPlayers}`,
    })
    .then((response) => {
      console.log(response);
      res
        .status(200)
        .json({ status: 200, message: 'Notification sent successfully!' });
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: error });
    });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
