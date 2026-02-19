import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Wall() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Wall of Love
            </h1>
            <p className="text-xl text-gray-400">
              Discover amazing projects built by the Bolt.new community
            </p>
          </div>

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
                Project Grid Coming Soon
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                The project showcase grid will be implemented in the next step. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
