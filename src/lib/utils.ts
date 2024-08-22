import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);

  });
};

export const getAudioDuration = (audioUrl: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio()
    audio.src = audioUrl

    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration)
    })

    audio.addEventListener('error', (error) => {
      reject(new Error('Failed to load audio file'))
    })
  })
}
