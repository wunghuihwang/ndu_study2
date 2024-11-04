import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="preload"
						href="https://i-vory.net/ivory/static/font/pretendard/Pretendard-1.3.9/web/static/woff2/Pretendard-Light.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="https://i-vory.net/ivory/static/font/pretendard/Pretendard-1.3.9/web/static/woff2/Pretendard-Regular.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="https://i-vory.net/ivory/static/font/pretendard/Pretendard-1.3.9/web/static/woff2/Pretendard-Bold.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
				</Head>
				<body className="loading">
					<Main />
					<div id="portal"></div>
					<div id="alert"></div>
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
