import { Modal, type ModalBaseProps } from '@mantine/core';

import { FeedbackToken } from '@/app/components/FeedbackToken';
import { config } from '@/constants/config';

export function HowToPlayModal({
  hide,
  show,
}: {
  hide: ModalBaseProps['onClose'];
  show: boolean;
}) {
  return (
    <Modal
      centered
      keepMounted
      onClose={hide}
      opened={show}
      size="md"
      styles={{
        content: {
          backfaceVisibility: 'unset',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
        },
        body: {
          marginRight: '16px',
        },
        header: {
          alignSelf: 'flex-end',
          height: '28px',
          minHeight: '28px',
          padding: 0,
          paddingBottom: 0,
          transition: 'none',
          width: '28px',
        },
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '25px',
          lineHeight: '30px',
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
          A maximum of one feedback token is provided per token in your attempt.
        </li>
        <li>
          No indication is provided regarding which token(s) in your attempt
          received feedback.
        </li>
      </ul>
      <p
        style={{
          marginBottom: 0,
        }}
      >
        A new code is released daily.
      </p>
    </Modal>
  );
}
