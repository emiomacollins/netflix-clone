/** @type {import('next').NextConfig} */

const withTranspiledModules = require('next-transpile-modules')([
	'@stripe/firestore-stripe-payments',
]);

const nextConfig = {
	reactStrictMode: true,
	compiler: { styledComponents: true },
	images: {
		domains: ['image.tmdb.org', 'rb.gy'],
	},
};

module.exports = withTranspiledModules(nextConfig);
