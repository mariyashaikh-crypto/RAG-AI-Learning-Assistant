import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { sendChatMessage } from '../services/api'
import { conversationStorage } from '../services/conversationStorage'

const createId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`
const now = () => new Date().toISOString()
const titleFrom = (text) => text.trim().replace(/\s+/g, ' ').slice(0, 46) || 'New conversation'

function createConversation(message) {
    const timestamp = now()
    return {
        id: createId(),
        title: titleFrom(message.content),
        createdAt: timestamp,
        updatedAt: timestamp,
        messages: [message],
    }
}

export function useChat(storage = conversationStorage) {
    const initialConversationsRef = useRef(null)
    if (initialConversationsRef.current === null) initialConversationsRef.current = storage.load()
    const [conversations, setConversations] = useState(initialConversationsRef.current)
    const [activeId, setActiveId] = useState(initialConversationsRef.current[0]?.id ?? null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const controllerRef = useRef(null)

    useEffect(() => {
        storage.save(conversations)
    }, [conversations, storage])

    useEffect(() => () => controllerRef.current?.abort(), [])

    const activeConversation = useMemo(
        () => conversations.find((conversation) => conversation.id === activeId) ?? null,
        [activeId, conversations],
    )

    const newChat = useCallback(() => {
        controllerRef.current?.abort()
        setActiveId(null)
        setError('')
        setIsLoading(false)
    }, [])

    const selectConversation = useCallback((id) => {
        if (isLoading) return
        setActiveId(id)
        setError('')
    }, [isLoading])

    const clearChats = useCallback(() => {
        controllerRef.current?.abort()
        setConversations([])
        setActiveId(null)
        setError('')
        setIsLoading(false)
        storage.clear()
    }, [storage])

    const submitMessage = useCallback(async (rawMessage) => {
        const content = rawMessage.trim()
        if (!content || isLoading) return false

        const userMessage = { id: createId(), role: 'user', content, createdAt: now(), sources: [] }
        let targetId = activeId

        if (!targetId) {
            const conversation = createConversation(userMessage)
            targetId = conversation.id
            setConversations((current) => [conversation, ...current])
            setActiveId(targetId)
        } else {
            setConversations((current) => current.map((conversation) => conversation.id === targetId
                ? { ...conversation, messages: [...conversation.messages, userMessage], updatedAt: now() }
                : conversation))
        }

        setError('')
        setIsLoading(true)
        const controller = new AbortController()
        controllerRef.current = controller

        try {
            const response = await sendChatMessage(content, { signal: controller.signal })
            const assistantMessage = {
                id: createId(),
                role: 'assistant',
                content: response.answer,
                createdAt: now(),
                sources: response.sources,
            }
            setConversations((current) => current.map((conversation) => conversation.id === targetId
                ? { ...conversation, messages: [...conversation.messages, assistantMessage], updatedAt: now() }
                : conversation))
            return true
        } catch (requestError) {
            if (requestError.code !== 'ERR_CANCELED') setError(requestError.message)
            return false
        } finally {
            if (controllerRef.current === controller) {
                controllerRef.current = null
                setIsLoading(false)
            }
        }
    }, [activeId, isLoading])

    return {
        conversations,
        activeConversation,
        activeId,
        isLoading,
        error,
        clearError: () => setError(''),
        newChat,
        selectConversation,
        clearChats,
        submitMessage,
    }
}
