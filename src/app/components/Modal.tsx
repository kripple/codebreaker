import { useCallback, useState } from 'react';

import { Button } from '@/app/components/Button';
import { HowToPlayModal } from '@/app/components/HowToPlayModal';
import { SvgIcon } from '@/app/components/SvgIcon';

export function Modal() {
  const [show, setShow] = useState<boolean>(false);

  const showModal = useCallback(() => {
    setShow(true);
  }, []);
  const hideModal = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <HowToPlayModal hide={hideModal} show={show} />
      <Button
        aria-label="How to play button"
        onClick={showModal}
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
    </>
  );
}
