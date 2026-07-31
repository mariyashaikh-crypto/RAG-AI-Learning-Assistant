import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <footer className="border-t border-line bg-white">
            <div className="page-container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:py-8">
                <div className="flex items-center gap-2 font-semibold text-ink">
                    <span className="grid size-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
                        <Sparkles size={16} aria-hidden="true" />
                    </span>
                    AI Learning Assistant
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                    <Link className="transition hover:text-brand-600" to="/about">About</Link>
                    <Link className="transition hover:text-brand-600" to="/chat">Chat</Link>
                    <span>Built for focused learning.</span>
                </div>
            </div>
        </footer>
    )
}
