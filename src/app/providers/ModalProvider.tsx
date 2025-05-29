import { Paper } from '@mantine/core';

import { FeedbackToken } from '@/app/components/FeedbackToken';
import { config } from '@/constants/config';
import { modalInputId } from '@/constants/ids';

import '@/app/providers/ModalProvider.css';

export function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <input
        id={modalInputId}
        style={{ display: 'none' }}
        type="checkbox"
      ></input>
      <div className="modal-provider">
        {children}
        <Paper className="modal" shadow="md" withBorder>
          <p
            style={{
              margin: 0,
              fontSize: '24px',
              lineHeight: '29px',
              fontWeight: 700,
              fontFamily: 'var(--body-font)',
            }}
          >
            How To Play
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '20px',
              lineHeight: '24px',
              fontWeight: 300,
              fontFamily: 'var(--body-font)',
            }}
          >
            Break the Code in {config.maxAttempts} tries.
          </p>
          <ul
            style={{
              margin: 0,
              paddingInlineStart: '20px',
              lineHeight: '24px',
            }}
          >
            <li>Repeats are allowed.</li>
            <li>Feedback will be 0-4 tokens to the left of your attempt.</li>
            <li>
              A black token{' '}
              <span style={{ display: 'inline-flex' }}>
                <FeedbackToken token="X" />
              </span>{' '}
              indicates that there is a token in your attempt that is correct in
              both color and position.
            </li>
            <li>
              A white token{' '}
              <span style={{ display: 'inline-flex' }}>
                <FeedbackToken token="O" />
              </span>{' '}
              indicates that there is a token in your attempt that belongs in
              the solution, but is incorrectly positioned.
            </li>
            <li>
              A maximum of one feedback token is provided per token in your
              attempt.
            </li>
            <li>
              No indication is provided regarding which token(s) in your attempt
              received feedback.
            </li>
          </ul>
          {/* TODO: Examples */}
          <p
            style={{
              marginBottom: 0,
            }}
          >
            A new code is released daily at midnight.
            {/* TODO: The next code will be released in <code>00:00:00</code> */}
          </p>
        </Paper>
      </div>
    </>
  );
}
