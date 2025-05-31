import { Box, Center, Container, Overlay, Paper } from '@mantine/core';

import { FeedbackToken } from '@/app/components/FeedbackToken';
import { Label } from '@/app/components/Label';
import { config } from '@/constants/config';
import { hideModalCheckboxId, modalDataName } from '@/constants/ids';

// overlay element is label (for clicking!)

export function HowToPlayModal() {
  return (
    <Box
      bottom={0}
      data-name={modalDataName}
      left={0}
      pos="absolute"
      right={0}
      style={{
        zIndex: 'var(--modal-z-index)',
      }}
      top={0}
    >
      <Overlay pos="fixed" />
      <Container h="100%" pos="relative" w="100%">
        <Center h="100%">
          <Paper
            className="modal"
            display="flex"
            m="xs"
            mah="100%"
            maw="400px"
            opacity={1}
            p="xl"
            shadow="md"
            style={{
              flexDirection: 'column',
              overflowY: 'scroll',
              zIndex: 'var(--modal-paper-z-index)',
            }}
          >
            <Box
              display="flex"
              style={{
                justifyContent: 'flex-end',
              }}
              w="100%"
            >
              <Label
                htmlFor={hideModalCheckboxId}
                style={{
                  display: 'flex',
                  height: '24px',
                  width: '24px',
                }}
              >
                <i className="close" />
              </Label>
            </Box>
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
                // margin: 0,
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
                indicates that there is a token in your attempt that is correct
                in both color and position.
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
                No indication is provided regarding which token(s) in your
                attempt received feedback.
              </li>
            </ul>

            <p
              style={{
                margin: 0,
              }}
            >
              A new code is released daily.
            </p>
          </Paper>
        </Center>
      </Container>
    </Box>
  );
}
