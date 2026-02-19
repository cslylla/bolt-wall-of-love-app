import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import ProjectCard from '../components/ProjectCard'
import AddProjectModal from '../components/AddProjectModal'
import EditProjectModal from '../components/EditProjectModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { supabase } from '../lib/supabase'

export default function Wall() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      loadProjects()
    }
  }, [user])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      navigate('/auth')
      return
    }
    setUser(user)
  }

  const loadProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading projects:', error)
    } else {
      setProjects(data || [])
    }
    setLoading(false)
  }

  const handleAddProject = async (formData) => {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData.user) {
      console.error('Error getting user:', userError)
      return
    }

    const { data: { user: userMetadata } } = await supabase.auth.getUser()
    const authorName = userMetadata?.user_metadata?.full_name || userMetadata?.email || 'Anonymous'

    const { error } = await supabase
      .from('projects')
      .insert([
        {
          ...formData,
          user_id: userData.user.id,
          author_name: authorName,
        },
      ])

    if (error) {
      console.error('Error adding project:', error)
    } else {
      setIsAddModalOpen(false)
      loadProjects()
    }
  }

  const handleEditProject = async (formData) => {
    const { error } = await supabase
      .from('projects')
      .update(formData)
      .eq('id', selectedProject.id)

    if (error) {
      console.error('Error updating project:', error)
    } else {
      setIsEditModalOpen(false)
      setSelectedProject(null)
      loadProjects()
    }
  }

  const handleDeleteProject = async () => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', selectedProject.id)

    if (error) {
      console.error('Error deleting project:', error)
    } else {
      setIsDeleteModalOpen(false)
      setSelectedProject(null)
      loadProjects()
    }
  }

  const openEditModal = (project) => {
    setSelectedProject(project)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (project) => {
    setSelectedProject(project)
    setIsDeleteModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 px-6 py-20 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Wall of Love
              </h1>
              <p className="text-xl text-gray-400">
                Discover amazing projects built by the Bolt.new community
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="primary"
              className="whitespace-nowrap"
            >
              Share your project
            </Button>
          </div>

          {projects.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-bolt-blue/10 mb-6">
                  <svg
                    className="w-10 h-10 text-bolt-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  No projects yet
                </h2>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  Be the first to share your project with the community!
                </p>
                <Button onClick={() => setIsAddModalOpen(true)} variant="primary">
                  Share your project
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  currentUserId={user?.id}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProject}
        authorName={user?.user_metadata?.full_name || user?.email || 'Anonymous'}
      />

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedProject(null)
        }}
        onSave={handleEditProject}
        project={selectedProject}
        authorName={selectedProject?.author_name}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedProject(null)
        }}
        onConfirm={handleDeleteProject}
        projectTitle={selectedProject?.title}
      />
    </div>
  )
}
