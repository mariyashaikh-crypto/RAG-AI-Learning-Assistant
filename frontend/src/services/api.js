import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    headers: { 'Content-Type': 'application/json' },
    timeout: 60000,
})

export async function sendChatMessage(query, options = {}) {
    try {
        const { data } = await apiClient.post('/api/chat', { query }, { signal: options.signal })

        if (!data || typeof data.answer !== 'string' || !data.answer.trim()) {
            throw new Error('The assistant returned an invalid response.')
        }

        return {
            answer: data.answer.trim(),
            sources: Array.isArray(data.sources) ? data.sources : [],
        }
    } catch (error) {
        if (axios.isCancel(error) || error.code === 'ERR_CANCELED') throw error
        if (error instanceof Error && error.message === 'The assistant returned an invalid response.') throw error
        throw new Error(error.response?.data?.message || 'The assistant could not be reached. Check the API configuration and try again.')
    }
}

export default apiClient
