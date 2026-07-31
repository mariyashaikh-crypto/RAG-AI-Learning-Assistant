import { BookOpen, BrainCircuit, Database, Search, Sparkles, Workflow } from 'lucide-react'

export const navigation = [
    { label: 'Home', to: '/' },
    { label: 'Chat', to: '/chat' },
    { label: 'About', to: '/about' },
]

export const features = [
    {
        icon: Search,
        title: 'Grounded explanations',
        description: 'Ask focused questions and receive answers informed by a curated collection of educational transcripts.',
    },
    {
        icon: BrainCircuit,
        title: 'Built for AI learning',
        description: 'Explore difficult concepts with an assistant designed specifically for modern artificial intelligence topics.',
    },
    {
        icon: Sparkles,
        title: 'Clear, useful responses',
        description: 'Read structured Markdown, examples, lists, and code in a distraction-free learning workspace.',
    },
]

export const workflow = [
    {
        icon: BookOpen,
        number: '01',
        title: 'Ask a question',
        description: 'Write a question about a supported AI topic in natural language.',
    },
    {
        icon: Database,
        number: '02',
        title: 'Retrieve context',
        description: 'The system searches educational transcript knowledge for relevant context.',
    },
    {
        icon: Workflow,
        number: '03',
        title: 'Generate an answer',
        description: 'A language model uses that context to produce a focused explanation.',
    },
]

export const topics = [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Large Language Models',
    'Retrieval-Augmented Generation',
    'Prompt Engineering',
    'Vector Databases',
    'Semantic Search',
    'Transformers',
    'AI Agents',
]

export const starterPrompts = [
    'How does retrieval-augmented generation work?',
    'Explain attention in transformers simply.',
    'What is the difference between semantic and keyword search?',
    'Why do vector databases matter for LLM applications?',
]
