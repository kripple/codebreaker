import { Modal } from '@mantine/core';
import { useState } from 'react';

import { Button } from '@/app/components/Button';
import { FeedbackToken } from '@/app/components/FeedbackToken';
import { Profiler } from '@/app/components/Profiler';
import { SvgIcon } from '@/app/components/SvgIcon';
import { config } from '@/constants/config';

export function HowToPlayModal() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Profiler component="HowToPlayModal">
      <Button
        onClick={() => setShow(true)}
        style={{
          aspectRatio: 1,
          background: 'none',
          border: 0,
          height: '100%',
          padding: '3px',
        }}
      >
        <SvgIcon icon="info" />
      </Button>
      <Modal
        centered
        onClose={() => setShow(false)}
        opened={show}
        size="md"
        styles={{
          header: {
            alignItems: 'flex-start',
          },
        }}
        title={
          <>
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
          </>
        }
      >
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
            indicates that there is a token in your attempt that belongs in the
            solution, but is incorrectly positioned.
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
      </Modal>
    </Profiler>
  );
}
