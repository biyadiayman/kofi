import React, { useState, useEffect } from "react";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>
        {playing ? (
          <img
            className="w-10"
            src="https://www.flaticon.com/svg/vstatic/svg/59/59284.svg?token=exp=1616249816~hmac=71e6c01e4f7d278d0059f772db27de3e"
          />
        ) : (
          <img
            className="w-8"
            src="https://www.flaticon.com/svg/vstatic/svg/727/727240.svg?token=exp=1616249815~hmac=6cc114159a62bea9646af97df4eec33b"
          />
        )}
      </button>
    </div>
  );
};

export default Player;
