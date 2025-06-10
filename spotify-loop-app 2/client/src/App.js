import React, { useEffect, useState, useRef } from 'react';

const App = () => {
  const [token, setToken] = useState(null);
  const [player, setPlayer] = useState(null);
  const [loop, setLoop] = useState({ start: 30, end: 45 });
  const [position, setPosition] = useState(0);
  const [trackUri, setTrackUri] = useState('');
  const playerRef = useRef(null);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.search);
    const tokenFromUrl = hash.get('access_token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new Spotify.Player({
        name: 'Loop Player',
        getOAuthToken: cb => cb(token),
        volume: 0.5,
      });

      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
      playerRef.current = spotifyPlayer;
    };
  }, [token]);

  useEffect(() => {
    if (!playerRef.current) return;

    const interval = setInterval(async () => {
      const state = await playerRef.current.getCurrentState();
      if (state) {
        const position_ms = state.position;
        setPosition(position_ms / 1000);

        if (position_ms / 1000 > loop.end) {
          playerRef.current.seek(loop.start * 1000);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loop]);

  const playSong = async () => {
    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: [trackUri], position_ms: loop.start * 1000 }),
    });

    if (response.ok) {
      console.log('Song playing from loop start.');
    }
  };

  return (
    <div>
      <h1>Spotify Loop Player</h1>
      {token ? (
        <>
          <label>Track URI:</label>
          <input
            type="text"
            value={trackUri}
            onChange={e => setTrackUri(e.target.value)}
            placeholder="spotify:track:..."
          />
          <br />
          <label>Loop Start (s):</label>
          <input
            type="number"
            value={loop.start}
            onChange={e => setLoop({ ...loop, start: parseFloat(e.target.value) })}
          />
          <label>Loop End (s):</label>
          <input
            type="number"
            value={loop.end}
            onChange={e => setLoop({ ...loop, end: parseFloat(e.target.value) })}
          />
          <br />
          <button onClick={playSong}>Play & Loop Track</button>
        </>
      ) : (
        <a href="http://localhost:8888/spotify/login">Login with Spotify</a>
      )}
    </div>
  );
};

export default App;