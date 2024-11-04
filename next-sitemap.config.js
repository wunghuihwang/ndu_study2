/** @type {import('next-sitemap').IConfig} */
const config = {
	// 사이트의 기본 URL 설정
	siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "/",

	// robots.txt 파일을 생성할지 여부
	generateRobotsTxt: true,

	// 사이트맵의 기본 변경 빈도 설정
	changefreq: "daily",

	// 사이트맵 항목의 우선순위 설정
	priority: 0.7,

	// 하나의 사이트맵 파일에 포함할 최대 URL 수
	sitemapSize: 5000,

	// robots.txt 파일의 옵션 설정
	robotsTxtOptions: {
		// robots.txt의 접근 정책 설정
		policies: [
			{
				userAgent: "*", // 모든 검색 엔진 크롤러에 대한 정책
				disallow: "/", // 모든 페이지 크롤링 금지
			},
		],
		// 추가 사이트맵 파일의 URL 목록
		additionalSitemaps: ["/sitemap-0.xml"],
	},

	// 사이트맵 항목을 변환하는 함수
	async transform(config, path) {
		// 동적 경로 예시
		// const dynamicRoutes = ["/dynamic1", "/dynamic2"];
		// if (dynamicRoutes.includes(path)) {
		//     return {
		//         loc: path,
		//         changefreq: "weekly",
		//         priority: 0.5,
		//         lastmod: new Date().toISOString(),
		//     };
		// }

		return {
			loc: path, // 경로
			changefreq: "daily", // 변경 빈도
			priority: 0.7, // 우선순위
			lastmod: new Date().toISOString(), // 마지막 수정 날짜
		};
	},
};

module.exports = config;
