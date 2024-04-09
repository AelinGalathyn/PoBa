/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol : 'https',
                hostname : 'poba.unas.hu',
                port: ''
            }
        ]
    }
}

export default nextConfig;
