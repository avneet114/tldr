import { SoundEffect } from "./types";

const SOUND_FILES: Record<SoundEffect | "click", string> = {
  bruh: "/sounds/bruh.mp3",
  faah: "/sounds/faah.mp3",
  thud: "/sounds/thud.mp3",
  error: "/sounds/error.mp3",
  niceshot: "/sounds/niceshot.mp3",
  click: "/sounds/click.mp3",
};

export function playSound(sound: SoundEffect | "click") {
  const audio = new Audio(SOUND_FILES[sound]);
  audio.volume = 0.5;
  audio.play().catch(() => {});
}
