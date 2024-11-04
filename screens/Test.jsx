import { useRouter } from "next/router";

const TestScreen = () => {
	const router = useRouter();

	return (
		<>
			Test
			<br />
			<button onClick={() => router.back()}>go back</button>
		</>
	);
};

export default TestScreen;
