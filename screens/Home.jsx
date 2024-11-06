import { postFileInfo, getFileInfo } from "@api/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

function FileUploadPage() {
	const [selectedFiles, setSelectedFiles] = useState([]); // 선택된 파일들을 저장하는 상태
	const [uploadResults, setUploadResults] = useState([]); // 업로드 결과를 저장하는 상태

	useEffect(() => {
		console.log("uploadResults", uploadResults); // 업로드 결과가 업데이트될 때마다 콘솔에 출력
	}, [uploadResults]);

	// 파일 업로드를 처리하는 Mutation
	const uploadFilesMutation = useMutation(postFileInfo, {
		// 업로드 성공 시 실행되는 함수. 업로드 결과를 업데이트한다.
		onSuccess: (data) => {
            console.log(data)
			setUploadResults((prevResults) => [...prevResults, data]); // 이전 업로드 결과에 새 결과 추가
            console.log(uploadResults)
		},
		// 업로드 실패 시 실행되는 함수. 에러 메시지를 출력하고 결과 목록에 실패한 업로드 정보를 추가한다.
		onError: (error) => {
			console.error("파일 업로드 실패:", error);
			setUploadResults((prevResults) => [...prevResults, { error: error.message }]);
		},
	});

	// 파일 선택 핸들러 - 사용자가 파일을 선택하면 파일 목록을 상태에 저장한다.
	const handleFileChange = (e) => {
		setSelectedFiles(Array.from(e.target.files)); // input에서 선택된 파일들을 배열로 변환하여 상태로 저장
	};

	// 파일 업로드 버튼 클릭 핸들러 - 선택된 파일들을 업로드한다.
	const handleUpload = () => {
		if (selectedFiles.length > 0) {
			setUploadResults([]); // 업로드 결과 초기화
			selectedFiles.forEach((file) => {
				// 각 파일을 formDataUpload 함수로 업로드 요청
				uploadFilesMutation.mutate({
					requestBody: file, // 업로드할 파일 본체
					originalFileName: file.name, // 업로드할 파일의 원본 이름
				});
			});
            
		} else {
			alert("파일을 선택하세요."); // 파일이 선택되지 않았을 경우 경고 메시지
		}
	};

    const { data } = useQuery({
        queryKey: ['fileData'],
        queryFn: () => getFileInfo({ querystring: { folderPath: "/uploads/2024/11/06" } }),
        select: (item) => item.items
      });

      useEffect(() => {
        console.log('data', data)
      }, [data])
	return (
		<div>
			<h1>파일 멀티 업로드</h1>
			<input
				type="file"
				multiple
				onChange={handleFileChange} // 파일 선택 시 handleFileChange 실행
			/>
			<button
				onClick={handleUpload} // 업로드 버튼 클릭 시 handleUpload 실행
				disabled={uploadFilesMutation.isLoading} // 업로드 중일 때 버튼 비활성화
				style={{ padding: 10, borderRadius: "0.5rem", backgroundColor: uploadFilesMutation.isLoading ? "#888" : "black", color: "white" }}
			>
				{/* 업로드 상태에 따라 버튼 텍스트 변경 */}
				{uploadFilesMutation.isLoading ? "업로드 중..." : "업로드"}
			</button>
			{uploadResults?.length > 0 && (
				// 업로드 결과가 존재할 경우 업로드 결과 표시
				<>
					<h2>업로드 결과</h2>
					<ul style={{ display: "flex", width: "100vw", overflow: "auto" }}>
						{uploadResults.map((result, index) => (
							<li
								key={index}
								style={{ flex: 1, position: "relative", maxWidth: 300, overflow: "hidden", aspectRatio: "3 / 2" }}
							>
								{uploadFilesMutation.isError ? (
									// 업로드 실패 시 에러 메시지 표시
									<span style={{ color: "red" }}>업로드 실패: {result.error}</span>
								) : (
									// 업로드 성공 시 업로드된 이미지 표시
									<Image
										style={{ width: "100%", height: "100%", objectFit: "cover" }}
										width={300}
										height={200}
										src={result.files[0].fileUrl} // 업로드된 파일의 URL
										alt={result.files[0].filePath.split("/").pop()} // 파일 경로에서 파일명 추출하여 alt 텍스트로 사용
									/>
								)}
							</li>
						))}
					</ul>
				</>
			)}
            <h2>파일 목록</h2>
            <ul>
                {
                    data.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <Image
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                    width={100}
                                    height={100}
                                    src={item.fileUrl} // 업로드된 파일의 URL
                                    alt={item.filePath.split("/").pop()} // 파일 경로에서 파일명 추출하여 alt 텍스트로 사용
                                />
                        </li>
                        )
                    })
                }
                <li></li>
            </ul>
		</div>
	);
}

  
export default FileUploadPage;