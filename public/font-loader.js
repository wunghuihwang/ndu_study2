document.addEventListener("DOMContentLoaded", function () {
	if (document.fonts && document.fonts.ready) {
		document.fonts.ready
			.then(function () {
				document.body.classList.remove("loading");
			})
			.catch(function (err) {
				console.error("Font loading failed:", err);
				document.body.classList.remove("loading");
			});
	} else {
		// 폰트 로드가 지원되지 않는 경우 바로 클래스 제거
		document.body.classList.remove("loading");
	}
});
