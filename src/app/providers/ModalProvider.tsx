import { HowToPlayModal } from '@/app/components/HowToPlayModal';
import { hideModalCheckboxId, showModalCheckboxId } from '@/constants/ids';

import '@/app/providers/ModalProvider.css';

type ModalEvent = KeyboardEvent | TouchEvent | WheelEvent;

export function ModalProvider({ children }: { children: ReactNode }) {
  // const preventScroll = (event: ModalEvent) => {
  //   // console.log(event.target);
  //   // Check if the scroll event is inside an allowed scroll container
  //   // for (const container of allowedScrollContainers) {
  //   //   if (container.contains(event.target)) {
  //   //     return; // Allow scroll
  //   //   }
  //   // }
  //   event.preventDefault(); // Block scroll elsewhere
  // };

  // window.addEventListener('wheel', preventScroll, { passive: false });
  // window.addEventListener('touchmove', preventScroll, { passive: false });
  // window.addEventListener('keydown', preventKeyScroll, { passive: false });

  // function preventKeyScroll(e) {
  //   const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // space, arrows, pgup/dn, etc.
  //   if (scrollKeys.includes(e.keyCode)) {
  //     // Allow keys only if focused inside allowed container
  //     for (const container of allowedScrollContainers) {
  //       if (container.contains(document.activeElement)) {
  //         return;
  //       }
  //     }
  //     e.preventDefault();
  //   }
  // }

  // return () => {
  //   // Cleanup
  //   window.removeEventListener('wheel', preventScroll);
  //   window.removeEventListener('touchmove', preventScroll);
  //   window.removeEventListener('keydown', preventKeyScroll);
  // };

  return (
    <>
      <input
        id={showModalCheckboxId}
        style={{ display: 'none' }}
        type="checkbox"
      ></input>
      <input
        defaultChecked
        id={hideModalCheckboxId}
        style={{ display: 'none' }}
        type="checkbox"
      ></input>
      <div data-name="modal-provider">
        <div
          data-name="modal-sibling"
          style={{
            position: 'absolute',
            zIndex: 'var(--modal-z-index)',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          {children}
        </div>
        <HowToPlayModal />
      </div>
    </>
  );
}
