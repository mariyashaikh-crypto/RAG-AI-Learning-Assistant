import { useEffect, useRef, useState } from 'react'
import { Send, Square } from 'lucide-react'

export function ChatComposer({ onSubmit, isLoading }) {
    const [value, setValue] = useState('')
    const textareaRef = useRef(null)

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return
        textarea.style.height = 'auto'
        textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
    }, [value])

    async function submit(event) {
        event?.preventDefault()
        if (!value.trim() || isLoading) return
        const message = value
        setValue('')
        await onSubmit(message)
    }

    function onKeyDown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            submit()
        }
    }

    return (
        <div className="border-t border-line bg-white px-3 py-3 sm:px-6 sm:py-4">
            <form className="mx-auto max-w-3xl" onSubmit={submit}>
                <label className="sr-only" htmlFor="chat-message">Ask a question</label>
                <div className="flex items-end gap-1.5 rounded-2xl border border-slate-300 bg-white p-1.5 shadow-card focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 sm:gap-2 sm:p-2">
                    <textarea
                        id="chat-message"
                        ref={textareaRef}
                        rows="1"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        onKeyDown={onKeyDown}
                        disabled={isLoading}
                        maxLength={4000}
                        placeholder="Ask about AI, RAG, transformers, or another supported topic..."
                        className="max-h-40 min-h-10 flex-1 resize-none border-0 bg-transparent px-2.5 py-2 text-sm leading-6 text-ink placeholder:text-slate-400 focus:ring-0 disabled:cursor-not-allowed sm:min-h-11 sm:px-3 sm:py-2.5 sm:text-[0.95rem]"
                    />
                    <button type="submit" disabled={!value.trim() || isLoading} className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:size-11" aria-label={isLoading ? 'Waiting for response' : 'Send message'}>
                        {isLoading ? <Square size={15} fill="currentColor" /> : <Send size={18} />}
                    </button>
                </div>
                <p className="mt-2 text-center text-xs text-slate-400">Enter to send · Shift + Enter for a new line · Responses may contain errors.</p>
            </form>
        </div>
    )
}
