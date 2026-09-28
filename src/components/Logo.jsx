export default function Logo({ size = 'base' }) {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  }

  const baseSize = sizeClasses[size] || sizeClasses.base

  return (
    <span className={`font-poppins font-bold text-slate-800 ${baseSize}`}>
      <span className="text-sky-500 opacity-50">E - Politi</span>
      <span className="text-sky-500 text-4xl opacity-70">X</span>
    </span>
  )
}