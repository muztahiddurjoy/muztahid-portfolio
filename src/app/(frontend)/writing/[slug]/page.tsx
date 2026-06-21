import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticle, getArticles } from '@/lib/content'
import ArticleDetail from '../../components/writing/article-detail'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const a = await getArticle(slug)
  if (!a) return { title: 'Article not found' }
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { title: a.title, description: a.excerpt, type: 'article' },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const articles = await getArticles()
  const i = articles.findIndex((x) => x.slug === slug)
  if (i === -1) notFound()
  return (
    <ArticleDetail
      article={articles[i]}
      prev={i > 0 ? articles[i - 1] : null}
      next={i < articles.length - 1 ? articles[i + 1] : null}
    />
  )
}
