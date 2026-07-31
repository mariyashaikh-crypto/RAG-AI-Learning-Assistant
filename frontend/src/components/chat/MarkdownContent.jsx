import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function CopyButton({ value, label = 'Copy' }) {
    const [copied, setCopied] = useState(false)

    async function copy() {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
        } catch {
            setCopied(false)
        }
    }

    return (
        <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-ink"
            aria-label={`${label} to clipboard`}
        >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            {copied ? 'Copied' : label}
        </button>
    )
}

function CodeBlock({ className, children }) {
    const language = /language-(\w+)/.exec(className || '')?.[1] || 'code'
    const value = String(children).replace(/\n$/, '')

    return (
        <div className="my-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2 text-xs text-slate-300">
                <span>{language}</span>
                <CopyButton value={value} label="Copy code" />
            </div>

            <pre className="m-0 overflow-x-auto p-4 text-sm leading-6 text-slate-100">
                <code>{value}</code>
            </pre>
        </div>
    )
}

export function MarkdownContent({ content }) {
    return (
        <div className="prose-chat">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    a: ({ children, ...props }) => (
                        <a {...props} target="_blank" rel="noreferrer">
                            {children}
                        </a>
                    ),
                    code: ({ className, children, ...props }) => {
                        const isBlock =
                            className?.startsWith('language-') ||
                            String(children).includes('\n')

                        return isBlock ? (
                            <CodeBlock className={className}>
                                {children}
                            </CodeBlock>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}