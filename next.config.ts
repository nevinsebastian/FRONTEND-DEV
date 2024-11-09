/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'assets.aceternity.com',
      'avatars.githubusercontent.com', // add this line
    ],
  },
};

module.exports = nextConfig;
