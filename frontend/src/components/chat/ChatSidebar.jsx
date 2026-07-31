import { MessageSquare, PanelLeftClose, PanelLeftOpen, Plus, Settings, Sparkles, Trash2, X } from 'lucide-react'
import { Button } from '../ui/Button'

export function ChatSidebar({ conversations, activeId, onSelect, onNew, onClear, collapsed, onToggle, mobileOpen, onMobileClose, disabled }) {
    const isCollapsed = collapsed && !mobileOpen
    const content = (
        <div className="flex h-full flex-col">
            <div className={`flex h-16 items-center border-b border-slate-800 ${isCollapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
                {!isCollapsed && <div className="flex items-center gap-2 font-semibold text-white"><Sparkles size={18} className="text-blue-400" /> AI Assistant</div>}
                <button type="button" onClick={mobileOpen ? onMobileClose : onToggle} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label={mobileOpen ? 'Close sidebar' : isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                    {mobileOpen ? <X size={20} /> : isCollapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
                </button>
            </div>

            <div className="p-3">
                <Button onClick={() => { onNew(); onMobileClose?.() }} className={`${isCollapsed ? 'size-10 px-0' : 'w-full'} bg-brand-600 hover:bg-brand-700`} aria-label="Start new chat" disabled={disabled}>
                    <Plus size={18} /> {!isCollapsed && 'New chat'}
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-3">
                {!isCollapsed && <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Recent conversations</p>}
                <div className="space-y-1">
                    {conversations.length === 0 && !isCollapsed && <p className="px-2 py-6 text-sm leading-6 text-slate-500">Your conversations will appear here and stay available on this device.</p>}
                    {conversations.map((conversation) => (
                        <button
                            type="button"
                            key={conversation.id}
                            onClick={() => { onSelect(conversation.id); onMobileClose?.() }}
                            disabled={disabled}
                            title={conversation.title}
                            className={`flex w-full items-center gap-3 rounded-xl text-left text-sm transition disabled:cursor-not-allowed ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'} ${activeId === conversation.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}
                        >
                            <MessageSquare size={17} className="shrink-0" />
                            {!isCollapsed && <span className="truncate">{conversation.title}</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-1 border-t border-slate-800 p-3">
                <button type="button" className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white ${isCollapsed ? 'justify-center' : ''}`} title="Settings (coming soon)" aria-label="Settings, coming soon">
                    <Settings size={18} /> {!isCollapsed && <span>Settings <span className="text-xs text-slate-600">(UI only)</span></span>}
                </button>
                {conversations.length > 0 && (
                    <button type="button" onClick={onClear} className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-sm text-slate-400 transition hover:bg-red-950/40 hover:text-red-300 ${isCollapsed ? 'justify-center' : ''}`} aria-label="Clear all chats">
                        <Trash2 size={18} /> {!isCollapsed && 'Clear all chats'}
                    </button>
                )}
            </div>
        </div>
    )

    return (
        <>
            <aside className={`hidden shrink-0 bg-slate-950 transition-[width] duration-200 lg:block ${collapsed ? 'w-16' : 'w-72'}`} aria-label="Conversation sidebar">{content}</aside>
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button type="button" aria-label="Close conversation sidebar" className="absolute inset-0 bg-slate-950/45" onClick={onMobileClose} />
                    <aside className="relative h-full w-[min(86vw,20rem)] bg-slate-950 shadow-2xl" aria-label="Conversation sidebar">{content}</aside>
                </div>
            )}
        </>
    )
}
