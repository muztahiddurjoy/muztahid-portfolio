import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Articles } from './collections/Articles'
import { Achievements } from './collections/Achievements'
import { Certificates } from './collections/Certificates'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { SiteSettings } from './globals/SiteSettings'
import { Home } from './globals/Home'
import { About } from './globals/About'
import { Contact } from './globals/Contact'
import { ProjectsPage } from './globals/ProjectsPage'
import { WritingPage } from './globals/WritingPage'
import { AchievementsPage } from './globals/AchievementsPage'
import { CertificatesPage } from './globals/CertificatesPage'
import { ProjectPage } from './globals/ProjectPage'
import { frontendPath, buildPreviewURL } from './lib/preview'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Durable media storage on serverless hosting (Vercel's filesystem is
 * ephemeral). Only enabled when a Blob token is present, so local dev keeps
 * using disk storage with zero extra setup.
 */
const plugins: Plugin[] = []
if (process.env.BLOB_READ_WRITE_TOKEN) {
  plugins.push(
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Muztahid Rahman',
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
      url: ({ data, collectionConfig, globalConfig }) =>
        buildPreviewURL(
          globalConfig
            ? frontendPath({ kind: 'global', slug: globalConfig.slug })
            : frontendPath({
                kind: 'collection',
                slug: collectionConfig?.slug ?? '',
                docSlug: typeof data?.slug === 'string' ? data.slug : undefined,
              }),
        ),
    },
  },
  collections: [
    Projects,
    Articles,
    Achievements,
    Certificates,
    Media,
    ContactSubmissions,
    Users,
  ],
  globals: [
    SiteSettings,
    Home,
    About,
    Contact,
    ProjectsPage,
    WritingPage,
    AchievementsPage,
    CertificatesPage,
    ProjectPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins,
})
