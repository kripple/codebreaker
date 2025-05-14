import { useState } from 'react';

import { GameBoard } from '@/app/components/GameBoard';
import { GameSoultion } from '@/app/components/GameSolution';
import { GameTokens } from '@/app/components/GameTokens';

export function Game() {
  const solutionLength = 4 as const;
  const [step, setStepValue] = useState<number>(0);
  const [tokenColor, setTokenColor] = useState<string>();

  const setStep = (value: string) => {
    const stepValue = parseInt(value);
    setStepValue(stepValue);
  };

  return (
    <>
      <GameSoultion length={solutionLength} />
      <GameBoard
        activeAttempt={step}
        allowedAttempts={5}
        setStep={setStep}
        setTokenColor={setTokenColor}
        solutionLength={solutionLength}
      />
      <GameTokens setTokenColor={setTokenColor} />
    </>
  );
}
