let clickSound: HTMLAudioElement | undefined;
let flipSound: HTMLAudioElement | undefined;

if (typeof window !== "undefined") {
  clickSound = new Audio("/sounds/pop.mp3");
  flipSound = new Audio("/sounds/flip.mp3");
}

const SoundPlayer = {
  playClick: () => {
    clickSound?.play();
  },
  playFlip: () => {
    flipSound?.play();
  },
};

export default SoundPlayer;