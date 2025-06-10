const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const spotifyRoutes = require('./spotify');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/spotify', spotifyRoutes);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

cd server
npm init -y
