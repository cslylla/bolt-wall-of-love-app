import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import ResetPassword from './pages/ResetPassword'
import Wall from './pages/Wall'
import ProtectedRoute from './components/ProtectedRoute'
import DeleteAccountModal from './components/DeleteAccountModal'
import { supabase } from './lib/supabase'

function AppContent() {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleDeleteAccount = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()

      if (!currentUser) {
        console.error('No user found')
        return
      }

      const { error: deleteProjectsError } = await supabase
        .from('projects')
        .delete()
        .eq('user_id', currentUser.id)

      if (deleteProjectsError) {
        console.error('Error deleting projects:', deleteProjectsError)
        return
      }

      const { error: deleteUserError } = await supabase.rpc('delete_user')

      if (deleteUserError) {
        console.error('Error deleting user:', deleteUserError)
        return
      }

      await supabase.auth.signOut()
      setIsDeleteAccountModalOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Error during account deletion:', error)
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing onOpenDeleteAccount={() => setIsDeleteAccountModalOpen(true)} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/wall"
          element={
            <ProtectedRoute>
              <Wall onOpenDeleteAccount={() => setIsDeleteAccountModalOpen(true)} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <DeleteAccountModal
        isOpen={isDeleteAccountModalOpen}
        onClose={() => setIsDeleteAccountModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
