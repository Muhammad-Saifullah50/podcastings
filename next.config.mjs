/** @type {import('next').NextConfig} */
const nextConfig = {
     images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'prlabsapi.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
            }
        ]
    }
};

export default nextConfig;

