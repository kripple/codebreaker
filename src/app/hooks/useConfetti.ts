import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export function useConfetti(yay: boolean) {
  useEffect(() => {
    if (!yay) return;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, [yay]);
}
