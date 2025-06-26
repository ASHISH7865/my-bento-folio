// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {cloudinaryStorage} from 'payload-cloudinary';
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { TechStack } from './collections/TechStack'
import { Profiles } from './collections/Profile'
import { Contacts } from './collections/Contact'
import { Blogs } from './collections/Blog'
import { Projects } from './collections/Projects'
import { About } from './collections/About'
import { ContactPage } from './collections/ContactPage'
import { Resume } from './collections/Resume'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)



export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Users, Media, Profiles, TechStack, Contacts, Blogs, Projects, About, ContactPage, Resume],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || '' } }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // Cloudinary storage plugin
    cloudinaryStorage({
      config:{
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
      },
      collections:{
        'media' : true
    },
    folder: 'ashish-dev-portfolio',
    disableLocalStorage: true, // Optional, defaults to true
    enabled: true // Optional, defaults to true
}
),
  ],
})
