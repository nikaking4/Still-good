import { useEffect } from 'react';
import Tesseract from 'tesseract.js';

export const pickImage = () =>
  new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.setAttribute('capture', 'environment');
    input.onchange = () => input.files[0] && resolve(input.files[0]);
    input.click();
  });

export function OcrRunner({ image, onProgress, onText, onError }) {
  useEffect(() => {
    let live = true;
    Tesseract.recognize(image, 'lit', {
      logger: (m) => live && m.status === 'recognizing text' && onProgress(m.progress),
    })
      .then(({ data }) => live && onText(data.text))
      .catch((e) => live && onError(e));
    return () => {
      live = false;
    };
  }, [image]);
  return null;
}
