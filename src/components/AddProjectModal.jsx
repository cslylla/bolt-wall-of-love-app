import { useState } from 'react'
import Button from './Button'

export default function AddProjectModal({ isOpen, onClose, onSave, authorName }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_url: '',
  })
  const [errors, setErrors] = useState({})

  const validateUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length > 80) {
      newErrors.title = 'Title must be 80 characters or less'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length > 400) {
      newErrors.description = 'Description must be 400 characters or less'
    }

    if (!formData.project_url.trim()) {
      newErrors.project_url = 'Project URL is required'
    } else if (!validateUrl(formData.project_url)) {
      newErrors.project_url = 'Please enter a valid URL'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave(formData)
    setFormData({ title: '', description: '', project_url: '' })
    setErrors({})
  }

  const handleCancel = () => {
    setFormData({ title: '', description: '', project_url: '' })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-bolt-card border border-bolt-border rounded-lg max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Share your project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Author</label>
            <input
              type="text"
              value={authorName}
              disabled
              className="w-full bg-bolt-bg border border-bolt-border rounded px-4 py-2 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value })
                if (errors.title) setErrors({ ...errors, title: '' })
              }}
              maxLength={80}
              className="w-full bg-bolt-bg border border-bolt-border rounded px-4 py-2 text-white focus:outline-none focus:border-bolt-blue"
              placeholder="My awesome project"
            />
            <div className="flex justify-between mt-1">
              {errors.title && (
                <span className="text-red-500 text-xs">{errors.title}</span>
              )}
              <span className="text-gray-500 text-xs ml-auto">
                {formData.title.length}/80
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value })
                if (errors.description) setErrors({ ...errors, description: '' })
              }}
              maxLength={400}
              rows={4}
              className="w-full bg-bolt-bg border border-bolt-border rounded px-4 py-2 text-white focus:outline-none focus:border-bolt-blue resize-none"
              placeholder="Tell us about your project..."
            />
            <div className="flex justify-between mt-1">
              {errors.description && (
                <span className="text-red-500 text-xs">{errors.description}</span>
              )}
              <span className="text-gray-500 text-xs ml-auto">
                {formData.description.length}/400
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Project URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.project_url}
              onChange={(e) => {
                setFormData({ ...formData, project_url: e.target.value })
                if (errors.project_url) setErrors({ ...errors, project_url: '' })
              }}
              className="w-full bg-bolt-bg border border-bolt-border rounded px-4 py-2 text-white focus:outline-none focus:border-bolt-blue"
              placeholder="https://example.com"
            />
            {errors.project_url && (
              <span className="text-red-500 text-xs mt-1 block">{errors.project_url}</span>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" className="flex-1">
              Save
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
