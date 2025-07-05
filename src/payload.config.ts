// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  BlocksFeature,
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  BlockquoteFeature,
  ChecklistFeature,
  IndentFeature,
  AlignFeature,
  UploadFeature,
  HorizontalRuleFeature,
  RelationshipFeature,
  TreeViewFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
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
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Core text features
      ParagraphFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),

      // Code features
      InlineCodeFeature(),

      // List features
      UnorderedListFeature(),
      OrderedListFeature(),
      ChecklistFeature(),

      // Formatting features
      BlockquoteFeature(),
      AlignFeature(),
      IndentFeature(),

      // Link and media features
      LinkFeature({
        enabledCollections: ['media'],
      }),
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'alt',
                type: 'text',
                required: true,
              },
              {
                name: 'caption',
                type: 'text',
              },
            ],
          },
        },
      }),

      // Relationship feature for linking to other content
      RelationshipFeature({
        enabledCollections: ['blogs', 'projects'],
      }),

      // Layout features
      HorizontalRuleFeature(),

      // Blocks feature for custom components
      BlocksFeature({
        blocks: [
          {
            slug: 'codePlayground',
            labels: {
              singular: 'Code Playground',
              plural: 'Code Playgrounds',
            },
            fields: [
              {
                name: 'title',
                type: 'text',
                required: true,
              },
              {
                name: 'language',
                type: 'select',
                required: true,
                options: [
                  { label: 'JavaScript', value: 'javascript' },
                  { label: 'TypeScript', value: 'typescript' },
                  { label: 'Python', value: 'python' },
                  { label: 'Java', value: 'java' },
                  { label: 'C++', value: 'cpp' },
                  { label: 'C#', value: 'csharp' },
                  { label: 'Go', value: 'go' },
                  { label: 'Rust', value: 'rust' },
                  { label: 'PHP', value: 'php' },
                  { label: 'Ruby', value: 'ruby' },
                  { label: 'Swift', value: 'swift' },
                  { label: 'Kotlin', value: 'kotlin' },
                  { label: 'Dart', value: 'dart' },
                  { label: 'HTML', value: 'html' },
                  { label: 'CSS', value: 'css' },
                  { label: 'SCSS', value: 'scss' },
                  { label: 'SQL', value: 'sql' },
                  { label: 'Shell', value: 'bash' },
                  { label: 'PowerShell', value: 'powershell' },
                  { label: 'Docker', value: 'dockerfile' },
                  { label: 'YAML', value: 'yaml' },
                  { label: 'JSON', value: 'json' },
                  { label: 'Markdown', value: 'markdown' },
                  { label: 'XML', value: 'xml' },
                  { label: 'GraphQL', value: 'graphql' },
                  { label: 'React JSX', value: 'jsx' },
                  { label: 'React TSX', value: 'tsx' },
                  { label: 'Vue', value: 'vue' },
                  { label: 'Svelte', value: 'svelte' },
                  { label: 'R', value: 'r' },
                  { label: 'Scala', value: 'scala' },
                  { label: 'Perl', value: 'perl' },
                  { label: 'Lua', value: 'lua' },
                  { label: 'Haskell', value: 'haskell' },
                  { label: 'Elixir', value: 'elixir' },
                  { label: 'Clojure', value: 'clojure' },
                  { label: 'F#', value: 'fsharp' },
                  { label: 'Plain Text', value: 'plaintext' },
                ],
              },
              {
                name: 'code',
                type: 'code',
                required: true,
              },
              {
                name: 'runnable',
                type: 'checkbox',
                defaultValue: true,
              },
              {
                name: 'showLineNumbers',
                type: 'checkbox',
                defaultValue: true,
              },
            ],
          },
          {
            slug: 'callout',
            labels: {
              singular: 'Callout',
              plural: 'Callouts',
            },
            fields: [
              {
                name: 'type',
                type: 'select',
                required: true,
                options: [
                  { label: 'Info', value: 'info' },
                  { label: 'Warning', value: 'warning' },
                  { label: 'Error', value: 'error' },
                  { label: 'Success', value: 'success' },
                  { label: 'Tip', value: 'tip' },
                ],
              },
              {
                name: 'title',
                type: 'text',
              },
              {
                name: 'content',
                type: 'richText',
                required: true,
                editor: lexicalEditor({
                  features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    BoldFeature(),
                    ItalicFeature(),
                    UnderlineFeature(),
                    LinkFeature(),
                    ParagraphFeature(),
                  ],
                }),
              },
            ],
          },
          {
            slug: 'embed',
            labels: {
              singular: 'Embed',
              plural: 'Embeds',
            },
            fields: [
              {
                name: 'type',
                type: 'select',
                required: true,
                options: [
                  { label: 'YouTube', value: 'youtube' },
                  { label: 'CodePen', value: 'codepen' },
                  { label: 'JSFiddle', value: 'jsfiddle' },
                  { label: 'Replit', value: 'replit' },
                  { label: 'GitHub Gist', value: 'gist' },
                  { label: 'Twitter', value: 'twitter' },
                  { label: 'Custom', value: 'custom' },
                ],
              },
              {
                name: 'url',
                type: 'text',
                required: true,
              },
              {
                name: 'title',
                type: 'text',
              },
              {
                name: 'width',
                type: 'text',
                defaultValue: '100%',
              },
              {
                name: 'height',
                type: 'text',
                defaultValue: '400px',
              },
            ],
          },
          {
            slug: 'twoColumn',
            labels: {
              singular: 'Two Column Layout',
              plural: 'Two Column Layouts',
            },
            fields: [
              {
                name: 'leftColumn',
                type: 'richText',
                required: true,
                editor: lexicalEditor({
                  features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    BoldFeature(),
                    ItalicFeature(),
                    UnderlineFeature(),
                    LinkFeature(),
                    ParagraphFeature(),
                  ],
                }),
              },
              {
                name: 'rightColumn',
                type: 'richText',
                required: true,
                editor: lexicalEditor({
                  features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    BoldFeature(),
                    ItalicFeature(),
                    UnderlineFeature(),
                    LinkFeature(),
                    ParagraphFeature(),
                  ],
                }),
              },
            ],
          },
        ],
      }),

      // Toolbar features
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      TreeViewFeature(),
    ],
  }),
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
