/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "dynamic-media-cdn.tripadvisor.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
