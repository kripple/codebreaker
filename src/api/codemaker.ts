import type { GameToken } from '@/types/token';

type SecretCode = [GameToken, GameToken, GameToken, GameToken];

export function makeSecretCode() {
  // TODO: create random solution with array sample
  const secretCode: SecretCode = ['1', '2', '3', '4'];
  return secretCode.join('');
}

// TODO: generate, store, encrypt
const tempSolution = makeSecretCode();

export function evaluateAttempt(guess: string, _solution?: string) {
  // TODO: throw error if solution input is used outside of a test env
  const solution = _solution ? _solution : tempSolution;

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
  return result;
}
