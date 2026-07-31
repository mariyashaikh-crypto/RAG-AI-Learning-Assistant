import { useState } from 'react'
import { Menu, Sparkles, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navigation } from '../../data/content'
import { ButtonLink } from '../ui/Button'

function NavigationLinks({ onNavigate, mobile = false }) {
    return navigation.map((item) => (
        <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
                `${mobile ? 'block rounded-xl px-3 py-2.5' : 'rounded-lg px-3 py-2'} text-sm font-medium transition ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-ink'
                }`
            }
        >
            {item.label}
        </NavLink>
    ))
}

export function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-white">
            <nav className="page-container flex h-14 items-center justify-between md:h-16" aria-label="Main navigation">
                <NavLink to="/" className="flex items-center gap-2 rounded-lg" aria-label="AI Learning Assistant home">
                    <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-white md:size-9 md:rounded-xl">
                        <Sparkles size={18} aria-hidden="true" />
                    </span>
                    <span className="font-bold tracking-tight text-ink">AI Learning Assistant</span>
                </NavLink>

                <div className="hidden items-center gap-1 md:flex">
                    <NavigationLinks />
                </div>

                <div className="hidden md:block">
                    <ButtonLink to="/chat" className="px-4 py-2.5">Start learning</ButtonLink>
                </div>

                <button
                    type="button"
                    className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 md:hidden"
                    aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={open}
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {open && (
                <div className="border-t border-line bg-white px-4 py-3 md:hidden">
                    <div className="space-y-1">
                        <NavigationLinks mobile onNavigate={() => setOpen(false)} />
                    </div>
                    <ButtonLink to="/chat" className="mt-3 w-full" onClick={() => setOpen(false)}>
                        Start learning
                    </ButtonLink>
                </div>
            )}
        </header>
    )
}
