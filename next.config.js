/** @type {import('next').NextConfig} */

const transpiler = require('next-transpile-modules');
const withTranspiledModules = transpiler(['@stripe/firestore-stripe-payments']);

const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['image.tmdb.org', 'rb.gy'],
	},
};

module.exports = withTranspiledModules(nextConfig);
