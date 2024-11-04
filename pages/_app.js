import { Hydrate, QueryClient, QueryClientProvider,  } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "animate.css";
import { useRouter } from "next/router";
import React, { Suspense, useState } from "react";
import { CookiesProvider } from "react-cookie";
import "../styles/global.scss";

/**
 * SiteApp 컴포넌트는 Next.js의 _app.js 파일에서 사용
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {React.Component} props.Component - 렌더링할 페이지 컴포넌트
 * @returns {JSX.Element} SiteApp 컴포넌트
 */
function SiteApp({ Component, pageProps }) {
	const [client] = useState(() => new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
                cacheTime: 0
			}
		}
	}));
	const router = useRouter();

	return (
		<>
			<QueryClientProvider client={client}>
				<ReactQueryDevtools initialIsOpen={false} />
				<Hydrate state={pageProps.dehydratedState}>
					<CookiesProvider>
						<Suspense fallback={<></>}>
							<Component {...pageProps} />
						</Suspense>
					</CookiesProvider>
				</Hydrate>
			</QueryClientProvider>
		</>
	);
}

export default SiteApp;
