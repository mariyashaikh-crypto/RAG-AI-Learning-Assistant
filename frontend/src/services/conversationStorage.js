const STORAGE_KEY = 'ai-learning-assistant:conversations'
const STORAGE_VERSION = 1

function isMessage(value) {
    return value &&
        typeof value.id === 'string' &&
        (value.role === 'user' || value.role === 'assistant') &&
        typeof value.content === 'string' &&
        typeof value.createdAt === 'string' &&
        (!('sources' in value) || Array.isArray(value.sources))
}

function isConversation(value) {
    return value &&
        typeof value.id === 'string' &&
        typeof value.title === 'string' &&
        typeof value.createdAt === 'string' &&
        typeof value.updatedAt === 'string' &&
        Array.isArray(value.messages) &&
        value.messages.every(isMessage)
}

export const conversationStorage = {
    load() {
        if (typeof window === 'undefined') return []

        try {
            const raw = window.localStorage.getItem(STORAGE_KEY)
            if (!raw) return []
            const payload = JSON.parse(raw)
            if (payload?.version !== STORAGE_VERSION || !Array.isArray(payload.conversations)) return []
            return payload.conversations.filter(isConversation)
        } catch {
            return []
        }
    },

    save(conversations) {
        if (typeof window === 'undefined') return false

        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
                version: STORAGE_VERSION,
                conversations: conversations.filter(isConversation),
            }))
            return true
        } catch {
            return false
        }
    },

    clear() {
        if (typeof window === 'undefined') return false

        try {
            window.localStorage.removeItem(STORAGE_KEY)
            return true
        } catch {
            return false
        }
    },
}
