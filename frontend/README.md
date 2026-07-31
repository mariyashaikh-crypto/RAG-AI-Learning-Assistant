# AI Learning Assistant — Frontend

A responsive React frontend for an educational assistant focused on AI, machine learning, LLMs, RAG, transformers, semantic search, and related topics.

## Technology

- React with Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Lucide React
- React Markdown with GitHub-flavored Markdown support

## Setup

```bash
npm install
copy .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL` in `.env` to the origin of the completed backend. Leave it empty to use same-origin requests.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Routes

- `/` — landing page
- `/chat` — chat workspace
- `/about` — product and high-level RAG explanation

## Placeholder API contract

The frontend sends:

```http
POST /api/chat
Content-Type: application/json
```

```json
{
  "query": "user message"
}
```

Expected response:

```json
{
  "answer": "assistant response"
}
```

The API boundary is isolated in `src/services/api.js`, so the endpoint and mapping can be updated without changing UI components. The response model accepts an optional future `sources` array internally, but citations are intentionally not displayed because the current backend does not expose them.

## Conversation persistence

Conversation history is stored locally in the browser using a versioned adapter in `src/services/conversationStorage.js`. The chat hook depends on the adapter interface (`load`, `save`, and `clear`), keeping UI components independent from persistence. A database-backed adapter can replace local storage later without redesigning the chat interface.

Storage is device- and browser-specific. Clearing browser site data removes saved chats.
