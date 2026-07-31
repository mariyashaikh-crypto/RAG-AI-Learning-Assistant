import { ArrowRight, CheckCircle2, MessageSquareText, Sparkles } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'
import { Card, Reveal, SectionHeading } from '../components/ui/Primitives'
import { features, workflow } from '../data/content'

export function LandingPage() {
    const topics = ['Machine Learning', 'Deep Learning', 'LLMs', 'RAG', 'Prompt Engineering', 'Transformers', 'Vector Databases', 'NLP', 'AI Agents']

    return (
        <>
            <section className="overflow-hidden border-b border-line bg-white py-10 sm:py-14 lg:py-16">
                <div className="page-container grid min-w-0 items-center gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
                    <Reveal>
                        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                            <Sparkles size={13} aria-hidden="true" />
                            Built for focused AI learning
                        </div>
                        <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                            Understand AI concepts, one clear answer at a time.
                        </h1>
                        <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                            Ask focused questions and turn complex ideas into practical, structured explanations grounded in educational content.
                        </p>
                        <div className="mt-5 flex flex-col gap-2.5 min-[390px]:flex-row min-[390px]:flex-wrap">
                            <ButtonLink to="/chat" className="w-full min-[390px]:w-auto">
                                Start a conversation <ArrowRight size={16} aria-hidden="true" />
                            </ButtonLink>
                            <ButtonLink to="/about" variant="secondary" className="w-full min-[390px]:w-auto">
                                See how it works
                            </ButtonLink>
                        </div>
                        <div className="mt-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Supported topics</p>
                            <div className="mt-2.5 flex flex-wrap gap-2">
                                {topics.map((topic) => (
                                    <span key={topic} className="whitespace-nowrap rounded-full border border-line bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="mx-auto w-full min-w-0 max-w-md rounded-2xl border border-line bg-canvas p-2.5 shadow-soft sm:p-3">
                            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
                                <div className="flex items-center justify-between border-b border-line px-3.5 py-3">
                                    <div className="flex min-w-0 items-center gap-2.5">
                                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-600 text-white">
                                            <MessageSquareText size={16} aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-ink">AI Learning Assistant</p>
                                            <p className="text-xs text-muted">Knowledge workspace</p>
                                        </div>
                                    </div>
                                    <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-emerald-700">
                                        <span className="size-1.5 rounded-full bg-emerald-500" /> Ready
                                    </span>
                                </div>
                                <div className="space-y-3 px-3 py-3.5 sm:px-4">
                                    <div className="ml-auto max-w-[86%] rounded-xl rounded-br-sm bg-brand-600 px-3 py-2 text-xs leading-5 text-white sm:text-sm">
                                        How does RAG improve an AI answer?
                                    </div>
                                    <div className="max-w-[94%] rounded-xl rounded-bl-sm border border-line bg-white px-3 py-2.5 text-xs leading-5 text-slate-700 shadow-sm sm:text-sm sm:leading-6">
                                        RAG retrieves relevant knowledge first, then gives that context to the model so its response is more focused and informed.
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {['Retrieval', 'Context', 'Generation'].map((item) => (
                                                <span key={item} className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700">{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border border-line bg-canvas px-3 py-2 text-xs text-slate-400">
                                        <span className="truncate">Ask a follow-up question...</span>
                                        <ArrowRight className="shrink-0 text-brand-600" size={15} aria-hidden="true" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                                {['Focused answers', 'Saved history', 'Markdown ready'].map((item) => (
                                    <span key={item} className="flex items-center gap-1"><CheckCircle2 size={12} className="text-brand-600" /> {item}</span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="bg-canvas py-10 sm:py-12 lg:py-14">
                <div className="page-container">
                    <SectionHeading eyebrow="Designed for learning" title="Everything you need to learn with focus" description="A streamlined workspace for asking better questions and building useful mental models." />
                    <div className="mt-7 grid items-stretch gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map(({ icon: Icon, title, description }, index) => (
                            <Reveal key={title} delay={index * 0.06} className="h-full">
                                <Card className="flex h-full items-start gap-3.5 p-4 sm:block sm:p-5">
                                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 sm:size-10"><Icon size={18} /></span>
                                    <div className="min-w-0 sm:mt-3.5">
                                        <h3 className="text-base font-semibold text-ink">{title}</h3>
                                        <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
                                    </div>
                                </Card>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-10 sm:py-12 lg:py-14">
                <div className="page-container">
                    <SectionHeading eyebrow="How it works" title="From question to grounded explanation" description="A clear workflow connects your question with relevant knowledge and a useful response." />
                    <div className="relative mt-7 grid gap-3 sm:mt-8 lg:grid-cols-3 lg:gap-4">
                        <div className="absolute left-[16.66%] right-[16.66%] top-5 hidden h-px bg-line lg:block" aria-hidden="true" />
                        {workflow.map(({ icon: Icon, number, title, description }, index) => (
                            <Reveal key={title} delay={index * 0.06} className="relative h-full">
                                <div className="flex h-full items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-sm lg:block lg:p-5">
                                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-lg border border-brand-100 bg-brand-50 text-brand-600"><Icon size={18} /></span>
                                    <div className="min-w-0 lg:mt-3.5">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">Step {number}</span>
                                        <h3 className="mt-1 text-base font-semibold text-ink">{title}</h3>
                                        <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-canvas py-10 sm:py-12">
                <div className="page-container">
                    <Reveal>
                        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-brand-100 bg-white px-5 py-7 shadow-card sm:flex-row sm:items-center sm:px-7 sm:py-8 lg:px-9">
                            <div className="max-w-xl">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Start learning</p>
                                <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Turn your next AI question into understanding.</h2>
                                <p className="mt-2 text-sm leading-6 text-muted sm:text-base">Open a focused workspace and keep your learning conversations available on this device.</p>
                            </div>
                            <ButtonLink to="/chat" className="w-full shrink-0 sm:w-auto">
                                Open the assistant <ArrowRight size={16} aria-hidden="true" />
                            </ButtonLink>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    )
}