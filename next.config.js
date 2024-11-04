/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		unoptimized: true,
		domains: ["localhost:1517"],
	},
	async rewrites() {
		return [
			{
				source: "/kakao_sdk/:path*",
				destination: "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/:path*",
			},
		];
	},
};

module.exports = nextConfig;
