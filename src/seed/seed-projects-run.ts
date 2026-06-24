/**
 * Seed ONLY the projects collection from the curated GitHub import.
 *
 *   npm run seed:projects
 *
 * Idempotent: wipes and recreates every project, so re-running converges to the
 * same set. Useful for iterating on project content without re-seeding globals.
 * Reads DATABASE_URL / PAYLOAD_SECRET from .env; requires a reachable database.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedProjects } from './seed-projects'

const run = async () => {
  const payload = await getPayload({ config })
  payload.logger.info('🌱 Seeding projects from the GitHub import…')
  const count = await seedProjects(payload)
  payload.logger.info(`✅ Seeded ${count} projects.`)
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Project seed failed:', err)
  process.exit(1)
})
