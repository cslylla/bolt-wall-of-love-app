import Button from './Button'

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, projectTitle }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(17, 17, 20, 0.95)' }}>
      <div className="bg-bolt-card border border-bolt-border rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Delete project</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete <span className="font-semibold text-white">"{projectTitle}"</span>? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            Confirm
          </Button>
          <Button
            onClick={onClose}
            variant="secondary"
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
