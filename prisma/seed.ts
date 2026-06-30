import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../app/generated/prisma'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const org = await prisma.organization.upsert({
    where: { apiKey: 'test-api-key-001' },
    update: {},
    create: {
      name: 'Test Organization',
      apiKey: 'test-api-key-001',
    },
  })

  const schema = {
    formName: 'Demo Request',
    fields: [
      {
        id: 'full_name',
        type: 'short_text',
        label: 'Full Name',
        description: "the person's full name",
        required: true,
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        description: 'their email address',
        required: true,
      },
      {
        id: 'team_size',
        type: 'single_choice',
        label: 'Team Size',
        description: 'approximate size of their team',
        options: ['1-10', '11-50', '51-200', '200+'],
        required: true,
      },
      {
        id: 'wants_demo',
        type: 'boolean',
        label: 'Wants Demo',
        description: 'whether they want a live demo or just general info',
        required: true,
      },
    ],
    rules: [],
  }

  const form = await prisma.conversationalForm.upsert({
    where: { slug: 'demo-request' },
    update: {
      schema,
      status: 'PUBLISHED',
    },
    create: {
      orgId: org.id,
      name: 'Demo Request Form',
      slug: 'demo-request',
      schema,
      status: 'PUBLISHED',
    },
  })

  console.log('Seeded organization:', org.id, org.name)
  console.log('Seeded form:', form.id, form.slug)
  console.log('')
  console.log('Test this form by starting a session with:')
  console.log(`POST /api/forms/${form.slug}/start`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })