/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.formmi.tech',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
