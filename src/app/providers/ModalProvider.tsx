import { HowToPlayModal } from '@/app/components/HowToPlayModal';
import { hideModalCheckboxId, showModalCheckboxId } from '@/constants/ids';

import '@/app/providers/ModalProvider.css';

export function ModalProvider({ children }: { children: ReactNode }) {
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
        {children}
        <HowToPlayModal />
      </div>
    </>
  );
}
