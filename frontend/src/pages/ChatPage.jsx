import { useState } from 'react'
import { AlertCircle, Menu, Sparkles, X } from 'lucide-react'
import { ChatComposer } from '../components/chat/ChatComposer'
import { ChatSidebar } from '../components/chat/ChatSidebar'
import { MessageList } from '../components/chat/MessageList'
import { starterPrompts } from '../data/content'
import { useChat } from '../hooks/useChat'

function Welcome({ onPrompt }) {
    return (
        <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center px-4 py-7 text-center sm:px-6 sm:py-10">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-soft"><Sparkles size={25} /></span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight sm:mt-6 sm:text-4xl">What would you like to learn?</h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted sm:max-w-xl sm:text-base sm:leading-7">Ask a focused question about artificial intelligence, machine learning, LLMs, RAG, and related topics.</p>
            <div className="mt-6 grid w-full gap-2.5 sm:mt-8 sm:gap-3 sm:grid-cols-2">
                {starterPrompts.map((prompt) => (
                    <button key={prompt} type="button" onClick={() => onPrompt(prompt)} className="rounded-xl border border-line bg-white p-3.5 text-left text-sm font-medium leading-6 text-slate-700 shadow-sm transition hover:border-brand-100 hover:bg-brand-50 hover:text-brand-700 sm:p-4">
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
    )
}

export function ChatPage() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const chat = useChat()
    const messages = chat.activeConversation?.messages ?? []

    function clearWithConfirmation() {
        if (window.confirm('Clear all saved conversations from this device?')) chat.clearChats()
    }

    return (
        <main className="flex h-[calc(100dvh-3.5rem)] min-h-[34rem] overflow-hidden bg-canvas md:h-[calc(100dvh-4rem)]">
            <ChatSidebar
                conversations={chat.conversations}
                activeId={chat.activeId}
                onSelect={chat.selectConversation}
                onNew={chat.newChat}
                onClear={clearWithConfirmation}
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed((value) => !value)}
                mobileOpen={mobileSidebarOpen}
                onMobileClose={() => setMobileSidebarOpen(false)}
                disabled={chat.isLoading}
            />

            <section className="flex min-w-0 flex-1 flex-col" aria-label="Chat workspace">
                <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-white px-3.5 sm:px-6 md:h-16">
                    <div className="flex min-w-0 items-center gap-3">
                        <button type="button" onClick={() => setMobileSidebarOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open conversation sidebar"><Menu size={20} /></button>
                        <div className="min-w-0">
                            <h2 className="truncate text-sm font-semibold text-ink">{chat.activeConversation?.title ?? 'New conversation'}</h2>
                            <p className="text-xs text-muted">AI learning workspace</p>
                        </div>
                    </div>
                    <span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:flex"><span className="size-2 rounded-full bg-emerald-500" /> Ready</span>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto">
                    {messages.length > 0 ? <MessageList messages={messages} isLoading={chat.isLoading} /> : <Welcome onPrompt={chat.submitMessage} />}
                </div>

                {chat.error && (
                    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
                        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                            <AlertCircle className="mt-0.5 shrink-0" size={18} />
                            <p className="flex-1">{chat.error}</p>
                            <button type="button" onClick={chat.clearError} className="rounded p-1 hover:bg-red-100" aria-label="Dismiss error"><X size={16} /></button>
                        </div>
                    </div>
                )}

                <ChatComposer onSubmit={chat.submitMessage} isLoading={chat.isLoading} />
            </section>
        </main>
    )
}
