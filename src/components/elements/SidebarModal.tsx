import { Transition } from '@headlessui/react';
import { RiCloseCircleFill } from 'react-icons/ri';

type Props = {
  isOpen: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
};

const SidebarModal = ({ isOpen, toggleModal, children }: Props) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Cek apakah yang diklik adalah backdrop (div dengan class "backdrop")
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <>
      {/* Modal sidebar */}
      <div
        className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto z-20 transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <button
            className="mt-2 p-1 bg-red-500 text-white rounded float-right"
            onClick={toggleModal}
          >
            <RiCloseCircleFill />
          </button>
          {children}
          
        </div>
      </div>

      {/* Overlay ketika modal muncul */}
      <div
        className={`fixed inset-0 bg-black opacity-25 z-10 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      ></div>
    </>
  );
};

export default SidebarModal;
