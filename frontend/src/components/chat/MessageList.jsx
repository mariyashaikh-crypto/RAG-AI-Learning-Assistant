import { useEffect, useRef } from 'react'
import { Bot, UserRound } from 'lucide-react'
import { CopyButton, MarkdownContent } from './MarkdownContent'

function Message({ message }) {
    const assistant = message.role === 'assistant'

    return (
        <article className={`flex gap-2.5 sm:gap-4 ${assistant ? '' : 'flex-row-reverse'}`}>
            <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${assistant ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-700'}`} aria-hidden="true">
                {assistant ? <Bot size={17} /> : <UserRound size={16} />}
            </span>
            <div className={`min-w-0 max-w-[88%] sm:max-w-[80%] ${assistant ? '' : 'text-right'}`}>
                <div className={`inline-block rounded-2xl px-3.5 py-2.5 text-left sm:px-4 sm:py-3 ${assistant ? 'rounded-tl-md border border-line bg-white shadow-sm' : 'rounded-tr-md bg-brand-600 text-white'}`}>
                    {assistant ? <MarkdownContent content={message.content} /> : <p className="whitespace-pre-wrap text-[0.95rem] leading-7">{message.content}</p>}
                </div>
                {assistant && <div className="mt-1"><CopyButton value={message.content} label="Copy response" /></div>}
            </div>
        </article>
    )
}

export function TypingIndicator() {
    return (
        <div className="flex gap-2.5 sm:gap-4" role="status" aria-label="Assistant is preparing a response">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-600 text-white"><Bot size={17} /></span>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-line bg-white px-4 py-4 shadow-sm">
                {[0, 1, 2].map((index) => <span key={index} className="size-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${index * 120}ms` }} />)}
            </div>
        </div>
    )
}

export function MessageList({ messages, isLoading }) {
    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, [messages, isLoading])

    return (
        <div className="mx-auto w-full max-w-3xl space-y-5 px-3.5 py-5 sm:space-y-7 sm:px-6 sm:py-7" aria-live="polite">
            {messages.map((message) => <Message key={message.id} message={message} />)}
            {isLoading && <TypingIndicator />}
            <div ref={endRef} />
        </div>
    )
}
