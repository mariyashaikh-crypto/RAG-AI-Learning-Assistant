import { motion, useReducedMotion } from 'framer-motion'

export function SectionHeading({ eyebrow, title, description, align = 'center' }) {
    const centered = align === 'center'

    return (
        <div className={`max-w-xl sm:max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
            {eyebrow && (
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 sm:mb-3 sm:text-sm">{eyebrow}</p>
            )}
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
            {description && <p className="mt-3 text-sm leading-6 text-muted sm:mt-4 sm:text-lg sm:leading-7">{description}</p>}
        </div>
    )
}

export function Reveal({ children, className = '', delay = 0 }) {
    const reduceMotion = useReducedMotion()

    return (
        <motion.div
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    )
}

export function Card({ children, className = '' }) {
    return <div className={`rounded-2xl border border-line bg-white shadow-card ${className}`}>{children}</div>
}
