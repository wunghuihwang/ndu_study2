const Custom404 = () => {
	return (
		<h1
			style={{
				textAlign: "center",
				fontSize: "1rem",
				fontWeight: 300,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				minHeight: "300px",
				height: `calc(100vh - ${document.querySelector(".header")?.scrollHeight + document.querySelector(".footer")?.scrollHeight}px)`,
			}}
		>
			404 not found
			<br />
			페이지를 찾을 수 없습니다.
		</h1>
	);
};

export default Custom404;
