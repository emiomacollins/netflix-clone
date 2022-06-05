/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['image.tmdb.org', 'rb.gy'],
	},
};

module.exports = nextConfig;
