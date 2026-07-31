import { Link } from 'react-router-dom'

const variants = {
    primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
    secondary: 'border border-line bg-white text-ink shadow-sm hover:border-slate-300 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-ink',
    danger: 'text-red-600 hover:bg-red-50',
}

export function Button({ className = '', variant = 'primary', children, ...props }) {
    return (
        <button
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition sm:px-4 sm:py-2.5 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export function ButtonLink({ className = '', variant = 'primary', children, ...props }) {
    return (
        <Link
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:px-5 sm:py-3 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </Link>
    )
}
