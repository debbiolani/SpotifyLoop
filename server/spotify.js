const express = require('express');
const axios = require('axios');
const qs = require('qs');
const router = express.Router();

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  REDIRECT_URI,
  FRONTEND_URI
} = process.env;

const authOptions = {
  headers: {
    Authorization:
      'Basic ' +
      Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

router.get('/login', (req, res) => {
  const scope = 'user-read-playback-state user-modify-playback-state streaming';
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${REDIRECT_URI}`;
  res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify({
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      authOptions
    );

    const { access_token, refresh_token } = tokenResponse.data;
    res.redirect(`${FRONTEND_URI}/?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (err) {
    res.status(400).json({ error: 'Token exchange failed' });
  }
});

module.exports = router;