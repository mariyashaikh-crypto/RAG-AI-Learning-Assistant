import { AlertCircle, ArrowRight, BookOpenCheck, Database, MessageSquareText, Sparkles, Workflow } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'
import { Card, Reveal, SectionHeading } from '../components/ui/Primitives'
import { topics } from '../data/content'

const pipeline = [
    { icon: MessageSquareText, title: 'Question', text: 'The learner asks a natural-language question.' },
    { icon: Database, title: 'Retrieval', text: 'Semantic search finds relevant transcript context.' },
    { icon: Workflow, title: 'Augmentation', text: 'The retrieved context is added to the model prompt.' },
    { icon: Sparkles, title: 'Answer', text: 'The model creates a focused, context-informed response.' },
]

export function AboutPage() {
    return (
        <>
            <section className="border-b border-line bg-canvas py-14 sm:py-20 lg:py-24">
                <div className="page-container">
                    <Reveal className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-sm font-semibold text-brand-700">
                            <BookOpenCheck size={16} /> About the assistant
                        </div>
                        <h1 className="mt-5 text-3xl font-bold tracking-[-0.035em] sm:mt-6 sm:text-5xl">A focused learning companion for modern AI.</h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:mt-6 sm:max-w-3xl sm:text-lg sm:leading-8">
                            AI Learning Assistant helps students explore technical concepts through a clear conversational interface. Its knowledge workflow uses educational video transcripts to support relevant explanations.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="bg-white py-14 sm:py-20 lg:py-24">
                <div className="page-container">
                    <SectionHeading align="left" eyebrow="The approach" title="Retrieval-augmented generation, simply explained" description="RAG helps a language model answer with context selected from a relevant knowledge collection." />
                    <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-4">
                        {pipeline.map(({ icon: Icon, title, text }, index) => (
                            <Reveal key={title} delay={index * 0.05}>
                                <Card className="h-full p-5 sm:p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon size={20} /></span>
                                        <span className="text-sm font-bold text-slate-300">0{index + 1}</span>
                                    </div>
                                    <h2 className="mt-4 text-lg font-semibold sm:mt-5">{title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                                </Card>
                            </Reveal>
                        ))}
                    </div>
                    <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 sm:mt-8 sm:p-5">
                        <AlertCircle className="mt-0.5 shrink-0" size={19} aria-hidden="true" />
                        <p><strong>Current capability:</strong> the backend response does not include citations or timestamps, so the interface does not display them. The message architecture can accept optional source metadata in a future update.</p>
                    </div>
                </div>
            </section>

            <section className="bg-canvas py-14 sm:py-20 lg:py-24">
                <div className="page-container grid gap-8 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
                    <SectionHeading align="left" eyebrow="Knowledge areas" title="Explore the foundations and the frontier" description="The assistant is designed around a focused set of interconnected artificial intelligence topics." />
                    <Reveal>
                        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                            {topics.map((topic) => (
                                <div key={topic} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3.5 font-medium text-slate-700 shadow-sm sm:py-4">
                                    <span className="size-2 rounded-full bg-brand-500" /> {topic}
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="bg-white py-12 sm:py-16">
                <div className="page-container flex flex-col items-start justify-between gap-5 rounded-2xl border border-line p-5 shadow-card sm:flex-row sm:items-center sm:gap-6 sm:p-9">
                    <div><h2 className="text-2xl font-bold">Turn curiosity into understanding.</h2><p className="mt-2 text-muted">Ask your first question in the learning workspace.</p></div>
                    <ButtonLink to="/chat">Start learning <ArrowRight size={17} /></ButtonLink>
                </div>
            </section>
        </>
    )
}
