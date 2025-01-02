import React, { useState, useEffect } from 'react';

// import ringer from "/../../../../assets/images/warning.mp3";
import ringer from "../../../../assets/images/warning.mp3";

export default function ExamCounterClockSoundComponent(props) {

  // const [isPlaying, setIsPlaying] = useState(props.isPlaying)
  const [playing, setPlaying] = useState(props.isPlaying);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing])

  const audio = new Audio(ringer);
  // audio.loop = true;

  return (
    <>
      {/* audio.play() */}
    </>
  );
};

/* 
{/* <div>
      <button
        onClick={() => {
          audio.loop = true;
          audio.play();
        }}
      >
        Play
      </button>
      <button onClick={() => (audio.loop = false)}>Pause</button>
    </div> */

