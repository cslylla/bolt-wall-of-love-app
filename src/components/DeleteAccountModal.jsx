import Button from './Button'

export default function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1f] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">Delete Account</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete your account? This will permanently delete your account and all your projects.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}
