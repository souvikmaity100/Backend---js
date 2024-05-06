
import './App.css'
import VideoPlayer from './VideoPlayer'
import videojs from "video.js";
import { useRef } from 'react'

function App() {

  const playerRef = useRef(null)
  const videoLink = "http://localhost:8000/uploads/courses/351bcbe8-00eb-4199-90d5-433bffd3e8fc/index.m3u8"

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL"
      }
    ]
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <div>
        <h1>V-Player</h1>
      </div>
      <VideoPlayer
      options={videoPlayerOptions}
      onReady={handlePlayerReady}
      />
    </>
  )
}

export default App
