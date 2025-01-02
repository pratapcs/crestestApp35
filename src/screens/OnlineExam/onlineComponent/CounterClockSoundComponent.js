import React, { useState, useEffect } from 'react';

// import ringer from "../../../../../images/warning.mp3";
// import dings from "../../../assets/warning.mp3"

var Sound = require('react-native-sound');

Sound.setCategory('Playback');



export default function CounterClockSoundComponent(props) {

  // const [isPlaying, setIsPlaying] = useState(props.isPlaying)
  const [playing, setPlaying] = useState(props.isPlaying);


  useEffect(() => {
    var ding = new Sound("warning.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
      
      playPause();
    });
    const playPause = () => {

      ding.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    };

    ding.setVolume(1);

    return () => {
      ding.release();
    };
  }, [playing]);

  /* useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing])

  const audio = new Audio(ringer); */
  // audio.loop = true;

  return (
    <>
      {/* audio.play() */}
    </>
  );
};

