import { SoundEffect } from "./types";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const SOUND_FILES: Record<SoundEffect | "click", string> = {
  bruh: `${BASE_PATH}/sounds/bruh.mp3`,
  faah: `${BASE_PATH}/sounds/faah.mp3`,
  thud: `${BASE_PATH}/sounds/thud.mp3`,
  error: `${BASE_PATH}/sounds/error.mp3`,
  niceshot: `${BASE_PATH}/sounds/niceshot.mp3`,
  click: `${BASE_PATH}/sounds/click.mp3`,
};

export function playSound(sound: SoundEffect | "click") {
  const audio = new Audio(SOUND_FILES[sound]);
  audio.volume = 0.5;
  audio.play().catch(() => {});
}
