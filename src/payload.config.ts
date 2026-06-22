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
  globals: [SiteSettings, Home, About, Contact],
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
