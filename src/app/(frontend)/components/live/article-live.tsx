'use client'

import ArticleDetail from '../writing/article-detail'
import { mapArticle } from '@/lib/mappers'
import { useLiveDoc } from './use-live-doc'
import { PreviewProvider } from '../preview-context'

export function ArticleLive({
  initialArticle,
  authorName,
}: {
  initialArticle: Record<string, unknown>
  authorName: string
}) {
  const live = useLiveDoc(initialArticle)
  return (
    <PreviewProvider>
      <ArticleDetail article={mapArticle(live)} prev={null} next={null} authorName={authorName} />
    </PreviewProvider>
  )
}
