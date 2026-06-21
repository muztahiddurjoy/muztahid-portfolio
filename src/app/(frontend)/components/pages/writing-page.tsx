'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { articles, writingCategoryMeta, type WritingCategory } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { Reveal } from '../ui/reveal'
import { AnimatedHeading } from '../ui/animated-heading'
import { ImageFrame } from '../ui/image-frame'
import { CtaButton } from '../ui/cta-button'
import { TransitionLink } from '../ui/transition-link'
import { Eyebrow, Tag, Signature } from '../ui/primitives'

type Filter = 'all' | WritingCategory

export default function WritingPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const featured = useMemo(() => articles.find((a) => a.featured), [])
  const rest = useMemo(() => articles.filter((a) => a.slug !== featured?.slug), [featured])
  const list = useMemo(
    () => (filter === 'all' ? rest : rest.filter((a) => a.category === filter)),
    [filter, rest],
  )

  const categories = Object.keys(writingCategoryMeta) as WritingCategory[]

  return (
    <main className="pt-28 md:pt-32">
      {/* ============================== HERO ============================== */}
      <section className="container-page pb-20 md:pb-28">
        <Reveal>
          <Eyebrow index="01">Writing</Eyebrow>
        </Reveal>

        <h1 className="mt-8 max-w-[16ch] font-display text-[var(--text-display)] leading-[0.98] tracking-tight">
          <AnimatedHeading as="span" immediate text="Notes on" className="block" />
          <AnimatedHeading
            as="span"
            immediate
            delay={0.12}
            text="building"
            wordClassName="display-italic"
            className="block"
          />
        </h1>

        <div className="mt-9 max-w-2xl">
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Field notes from the workshop — essays on founding companies, engineering the systems
              beneath them, teaching robots to hold their line on unforgiving terrain, and the
              occasional argument about why things should be{' '}
              <span className="display-italic text-foreground">built to last</span>.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <Signature className="text-xl text-foreground">from the desk</Signature>
            <span className="hidden h-px w-8 bg-border-strong sm:block" />
            <span>
              {articles.length} essays · founding, engineering, robotics &amp; the long view
            </span>
          </p>
        </Reveal>
      </section>

      {/* ============================ FEATURED =========================== */}
      {featured && (
        <section
          aria-labelledby="featured-heading"
          className="border-y border-border bg-elevated"
        >
          <div className="container-page py-20 md:py-28">
            <Reveal>
              <Eyebrow index="02">Featured</Eyebrow>
            </Reveal>

            <div className="mt-10 grid items-center gap-10 md:mt-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
              <Reveal>
                <TransitionLink
                  href={`/writing/${featured.slug}`}
                  data-cursor
                  aria-label={`Read ${featured.title}`}
                  className="group block"
                >
                  <ImageFrame
                    label={featured.cover.label}
                    caption={featured.cover.caption}
                    ratio="aspect-[16/10]"
                  />
                </TransitionLink>
              </Reveal>

              <Reveal delay={0.12}>
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="eyebrow">{writingCategoryMeta[featured.category].label}</span>
                    <span className="h-1 w-1 rounded-full bg-border-strong" />
                    <span className="text-sm text-muted-foreground">{featured.dateLabel}</span>
                    <span className="h-1 w-1 rounded-full bg-border-strong" />
                    <span className="text-sm text-muted-foreground">{featured.readTime} read</span>
                  </div>

                  <h2
                    id="featured-heading"
                    className="mt-5 font-display text-[var(--text-title)] leading-[1.04] tracking-tight"
                  >
                    <TransitionLink
                      href={`/writing/${featured.slug}`}
                      data-cursor
                      className="link-underline"
                    >
                      {featured.title}
                    </TransitionLink>
                  </h2>

                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                    <CtaButton
                      href={`/writing/${featured.slug}`}
                      variant="text"
                      icon="arrow-right"
                    >
                      Read the essay
                    </CtaButton>
                    <div className="flex flex-wrap gap-2">
                      {featured.tags.slice(0, 3).map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ===================== FILTER + ARCHIVE LIST ===================== */}
      <section aria-labelledby="archive-heading" className="container-page py-24 md:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow index="03">The archive</Eyebrow>
            <h2
              id="archive-heading"
              className="mt-6 max-w-xl font-display text-[var(--text-head)] leading-[1.05] tracking-tight"
            >
              Everything else, in <span className="display-italic">order of thought</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              role="group"
              aria-label="Filter writing by category"
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
                All
              </FilterButton>
              {categories.map((key) => (
                <FilterButton
                  key={key}
                  active={filter === key}
                  onClick={() => setFilter(key)}
                >
                  {writingCategoryMeta[key].label}
                </FilterButton>
              ))}
            </div>
          </Reveal>
        </div>

        {/* rows */}
        {list.length > 0 ? (
          <ul className="mt-14 border-t border-border md:mt-16">
            {list.map((article, i) => (
              <li key={article.slug}>
                <Reveal delay={Math.min(i, 5) * 0.05}>
                  <TransitionLink
                    href={`/writing/${article.slug}`}
                    data-cursor
                    className="group block border-b border-border py-9 transition-colors duration-500 hover:bg-card/60 md:py-11"
                  >
                    <div className="grid gap-5 md:grid-cols-[13rem_1fr] md:gap-12">
                      {/* meta */}
                      <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1 md:flex-col md:items-start md:gap-3">
                        <span className="font-script text-lg text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <time
                          dateTime={article.date}
                          className="text-sm text-muted-foreground"
                        >
                          {article.dateLabel}
                        </time>
                        <span className="text-sm text-muted-foreground md:hidden">·</span>
                        <span className="text-sm text-muted-foreground">
                          {article.readTime} read
                        </span>
                        <span className="eyebrow md:mt-1">
                          {writingCategoryMeta[article.category].label}
                        </span>
                      </div>

                      {/* content */}
                      <div>
                        <div className="flex items-start justify-between gap-6">
                          <h3 className="font-display text-[var(--text-head)] leading-[1.08] tracking-tight">
                            <span className="relative inline">
                              {article.title}
                              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100" />
                            </span>
                          </h3>
                          <ArrowUpRight
                            className="mt-1.5 h-5 w-5 shrink-0 -translate-x-2 text-muted-foreground opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:text-foreground group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                            aria-hidden="true"
                          />
                        </div>

                        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                          {article.excerpt}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {article.tags.slice(0, 4).map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TransitionLink>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-14 border-t border-border py-20 text-center md:mt-16">
            <p className="font-display text-[var(--text-head)] tracking-tight">
              Nothing filed under{' '}
              <span className="display-italic">
                {filter !== 'all' && writingCategoryMeta[filter].label}
              </span>{' '}
              yet.
            </p>
            <p className="mt-3 text-muted-foreground">More notes are on the way — try another lens.</p>
            <button
              type="button"
              data-cursor
              onClick={() => setFilter('all')}
              className="mt-6 inline-block link-underline text-sm font-medium"
            >
              View all writing
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

/* ---------- quiet editorial filter button ---------- */
function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      data-cursor
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'group relative text-sm tracking-tight transition-colors duration-300',
        active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          'absolute -bottom-1.5 left-0 h-px bg-foreground transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          active ? 'w-full' : 'w-0 group-hover:w-full',
        )}
      />
    </button>
  )
}
