import ReactModal from 'react-modal';
type Props = {
    isOpen: boolean;
    onDeleteConfirmed: () => void;
    onClose: () => void;
};

const DeleteModal = ({ isOpen, onClose, onDeleteConfirmed }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
        <p>Apakah Anda yakin ingin menghapus data ini?</p>
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-red-500 text-white rounded"
            onClick={onDeleteConfirmed}
          >
            Hapus
          </button>
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onClose}
          >
            Batal
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default DeleteModal;
