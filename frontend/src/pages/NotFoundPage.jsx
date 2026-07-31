import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'

export function NotFoundPage() {
    return (
        <main className="page-container grid min-h-[65vh] place-items-center py-20 text-center">
            <div>
                <p className="text-sm font-bold tracking-[0.2em] text-brand-600">404</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight">Page not found</h1>
                <p className="mt-4 text-muted">The page you requested does not exist.</p>
                <ButtonLink to="/" className="mt-7"><ArrowLeft size={17} /> Back to home</ButtonLink>
            </div>
        </main>
    )
}
