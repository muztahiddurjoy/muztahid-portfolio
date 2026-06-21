'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { type Article, type Block, writingCategoryMeta } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { TransitionLink } from '../ui/transition-link'
import { AnimatedHeading } from '../ui/animated-heading'
import { ImageFrame } from '../ui/image-frame'
import { Reveal } from '../ui/reveal'
import { Tag, Signature, Divider } from '../ui/primitives'

function ArticleBlock({
  block,
  index,
  dropCap,
}: {
  block: Block
  index: number
  dropCap: boolean
}) {
  if (block.type === 'h') {
    return (
      <Reveal
        as="h2"
        delay={Math.min(index, 4) * 0.02}
        className="mb-3 mt-12 font-display text-2xl leading-tight tracking-tight md:text-[1.75rem]"
      >
        {block.text}
      </Reveal>
    )
  }

  if (block.type === 'quote') {
    return (
      <Reveal as="figure" className="my-10">
        <blockquote className="border-l-2 border-border-strong pl-6 font-display text-2xl italic leading-snug text-foreground md:pl-8 md:text-[1.95rem]">
          {block.text}
        </blockquote>
      </Reveal>
    )
  }

  return (
    <Reveal
      as="p"
      className={cn(
        'mt-6 text-lg leading-relaxed text-foreground/90',
        dropCap &&
          'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:font-medium first-letter:leading-[0.72] first-letter:text-foreground',
      )}
    >
      {block.text}
    </Reveal>
  )
}

export default function ArticleDetail({
  article,
  prev,
  next,
}: {
  article: Article
  prev: Article | null
  next: Article | null
}) {
  const firstParagraphIndex = article.body.findIndex((b) => b.type === 'p')

  return (
    <div className="pt-28 md:pt-32">
      {/* Back bar */}
      <div className="container-page">
        <TransitionLink
          href="/writing"
          data-cursor
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="link-underline">All writing</span>
        </TransitionLink>
      </div>

      {/* Header */}
      <header className="container-prose mt-10 md:mt-14">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="eyebrow">{writingCategoryMeta[article.category].label}</span>
            <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden />
            <span className="text-sm text-muted-foreground">{article.dateLabel}</span>
            <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden />
            <span className="text-sm text-muted-foreground">{article.readTime} read</span>
          </div>
        </Reveal>

        <AnimatedHeading
          as="h1"
          immediate
          text={article.title}
          className="mt-6 font-display text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1.05] tracking-tight"
        />

        <Reveal delay={0.1}>
          <p className="mt-7 text-xl leading-relaxed text-muted-foreground md:text-2xl">
            {article.excerpt}
          </p>
        </Reveal>
      </header>

      {/* Cover */}
      <Reveal className="container-page mt-12 md:mt-16" delay={0.05}>
        <figure className="mx-auto max-w-4xl">
          <ImageFrame
            label={article.cover.label}
            caption={article.cover.caption}
            ratio="aspect-[16/9]"
          />
        </figure>
      </Reveal>

      {/* Body */}
      <div className="container-prose mt-14 md:mt-20">
        {article.body.map((block, i) => (
          <ArticleBlock key={i} block={block} index={i} dropCap={i === firstParagraphIndex} />
        ))}
      </div>

      {/* Byline + tags */}
      <footer className="container-prose mt-16">
        <Divider />
        <Reveal className="mt-8 flex flex-wrap gap-2.5">
          {article.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Reveal>
        <Reveal className="mt-10 flex items-center gap-4" delay={0.05}>
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-strong font-display text-lg"
            aria-hidden
          >
            MR
          </span>
          <span className="flex flex-col">
            <span className="eyebrow">Written by</span>
            <Signature className="text-3xl leading-none text-foreground">
              Muztahid Rahman
            </Signature>
          </span>
        </Reveal>
      </footer>

      {/* Prev / next */}
      {(prev || next) && (
        <nav aria-label="More writing" className="container-page mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-4 border-t border-border pt-12 md:grid-cols-2 md:gap-6">
            {prev ? (
              <TransitionLink
                href={`/writing/${prev.slug}`}
                data-cursor
                className="group rounded-[var(--radius)] border border-border bg-card p-7 transition-colors duration-400 hover:border-border-strong"
              >
                <span className="eyebrow flex items-center gap-2">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                  Previous
                </span>
                <p className="mt-3 font-display text-xl leading-snug tracking-tight md:text-2xl">
                  {prev.title}
                </p>
              </TransitionLink>
            ) : (
              <span aria-hidden className="hidden md:block" />
            )}

            {next ? (
              <TransitionLink
                href={`/writing/${next.slug}`}
                data-cursor
                className="group rounded-[var(--radius)] border border-border bg-card p-7 transition-colors duration-400 hover:border-border-strong md:text-right"
              >
                <span className="eyebrow flex items-center gap-2 md:justify-end">
                  Next
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <p className="mt-3 font-display text-xl leading-snug tracking-tight md:text-2xl">
                  {next.title}
                </p>
              </TransitionLink>
            ) : (
              <span aria-hidden className="hidden md:block" />
            )}
          </div>
        </nav>
      )}
    </div>
  )
}
