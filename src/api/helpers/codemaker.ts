import { config, gameTokens, winningFeedback } from '@/constants';
import { sample } from '@/utils/array-sample';

export function makeSecretCode() {
  const ids = gameTokens.map((token) => token.id);
  const selectedTokens = new Array(config.solutionLength)
    .fill(0)
    .map(() => sample(ids));
  return selectedTokens.join('');
}

export function evaluateAttempt(guess: string, solution: string) {
  const tokens = guess.split('');
  const secretTokens = solution.split('');
  const feedback: string[] = [];

  // Find exact matches
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const secretToken = secretTokens[i];

    if (token === secretToken) {
      feedback.push('X');
      delete tokens[i];
      delete secretTokens[i];
    }
  }

  // Find partial matches
  for (let j = 0; j < tokens.length; j++) {
    const token = tokens[j];
    const index = secretTokens.findIndex(
      (secretToken) => Boolean(token && secretToken) && token === secretToken,
    );

    if (index !== -1) {
      feedback.push('O');
      delete tokens[j];
      delete secretTokens[index];
    }
  }

  // Pad the result
  const result = feedback.join('').padEnd(tokens.length, '-');
  return { feedback: result, win: result === winningFeedback };
}
