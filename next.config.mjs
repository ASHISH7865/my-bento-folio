import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
            },
            {
                hostname: 'res.cloudinary.com',
            },
        ],
    },
  // Your Next.js config here
}

export default withPayload(nextConfig)
