export default function ProjectCard({ project, currentUserId, onEdit, onDelete, onSupport, isSupporting }) {
  const isOwner = project.user_id === currentUserId

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="bg-bolt-card border border-bolt-border rounded-lg p-6 flex flex-col h-[400px] transition-all duration-300 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
      <div className="flex justify-between items-start mb-4">
        <span className="text-gray-400 text-sm">{project.author_name}</span>
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Edit project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(project)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Delete project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 mb-4">
        <h3 className="text-white text-xl font-semibold mb-3">
          {truncateText(project.title, 80)}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {truncateText(project.description, 400)}
        </p>
      </div>

      <div className="space-y-3">
        <a
          href={project.project_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bolt-blue text-sm hover:text-bolt-blue-light transition-colors inline-flex items-center gap-1"
        >
          Open project
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs">
            {formatDate(project.created_at)}
          </span>
          {!isOwner && (
            <button
              onClick={() => onSupport(project)}
              disabled={isSupporting}
              className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
                isSupporting
                  ? 'bg-gray-700 text-gray-500 cursor-wait'
                  : 'bg-bolt-blue text-white hover:bg-bolt-blue-light hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
              }`}
            >
              {isSupporting ? 'Processing...' : 'Support ⚡'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
