export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'px-6 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bolt-blue focus:ring-offset-2 focus:ring-offset-bolt-bg'

  const variants = {
    primary: 'bg-bolt-blue text-white hover:bg-opacity-90',
    secondary: 'border border-white/20 text-white hover:border-white/40',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
