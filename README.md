# SpotifyLoop
A FULL STACK WEB APPLICATION TO LOOP YOUR FAVOURITE PART OF ANY SPOTIFY SONG

🚀 Features
- Spotify authentication
- Set and loop a custom song segment
- Playback through Spotify Web Playback SDK

🛠 Tech Stack
- Front-End: React
- Back-End: Node.js + Express
- Spotify Web API + Web Playback SDK

🔧 Setup

1. Clone the repo:
git clone https://github.com/your-username/spotify-loop-app.git
cd spotify-loop-app

2. Install dependencies:
# Client
cd client
npm install

# Server
cd ../server
npm install

3. Create a `.env` file in /server with:
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:8888/spotify/callback
FRONTEND_URI=http://localhost:3000

4. Run the app:
# Server
cd server
npm run dev

# Client
cd client
npm start

Open http://localhost:3000 and enjoy!
![image](https://github.com/user-attachments/assets/aef43bef-b74c-4a1b-8a75-51d6a926abc9)
