import { Text, Timeline } from '@mantine/core';

import { GameRow } from '@/app/components/GameRow';

export function GameBoard({
  activeAttempt,
  allowedAttempts,
  setTokenColor,
  solutionLength,
  setStep,
}: {
  activeAttempt: number;
  allowedAttempts: number;
  setTokenColor: SetValue;
  solutionLength: number;
  setStep: SetValue;
}) {
  const rowItems = new Array(allowedAttempts).fill(0).map((_, i) => {
    const step = allowedAttempts - i;
    const isActive = activeAttempt === step - 1;

    return (
      <Timeline.Item
        bullet={<Text className="bullet-text">{step}</Text>}
        key={i}
      >
        <GameRow
          active={isActive}
          count={solutionLength}
          setTokenColor={setTokenColor}
        />
      </Timeline.Item>
    );
  });

  return (
    <Timeline active={activeAttempt} reverseActive>
      {rowItems}
    </Timeline>
  );
}
