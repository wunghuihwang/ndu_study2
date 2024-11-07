import { postFileInfo, getFileInfo, deleteChoiceFileInfo, deleteFileInfo } from "@api/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function FileUploadPage() {
	const [selectedFiles, setSelectedFiles] = useState([]); // 선택된 파일들을 저장하는 상태
	const [uploadResults, setUploadResults] = useState([]); // 업로드 결과를 저장하는 상태
	const [dateValue, setDateValue] = useState("");
	const [toDay, setToDay] = useState(null);
	const [maxDate, setMaxDate] = useState(null);
	const dateInputRef = useRef(null)

	useEffect(() => {
		console.log("uploadResults", uploadResults); // 업로드 결과가 업데이트될 때마다 콘솔에 출력
	}, [uploadResults]);
	
	// 파일 목록 가져오기
	const { data, refetch } = useQuery({
		queryKey: ['fileData'],
		queryFn: () => getFileInfo({ querystring: { folderPath: `/uploads/${toDay}` } }),
		select: (item) => item?.items || [],
	});

	// 파일 업로드를 처리하는 Mutation
	const uploadFilesMutation = useMutation(postFileInfo, {
		// 업로드 성공 시 실행되는 함수. 업로드 결과를 업데이트한다.
		onSuccess: (data) => {
			setUploadResults((prevResults) => [...prevResults, data]); // 이전 업로드 결과에 새 결과 추가
            refetch()
		},
		// 업로드 실패 시 실행되는 함수. 에러 메시지를 출력하고 결과 목록에 실패한 업로드 정보를 추가한다.
		onError: (error) => {
			console.error("파일 업로드 실패:", error);
			setUploadResults((prevResults) => [...prevResults, { error: error.message }]);
		},
	})

	// 파일 선택 삭제 Mutaion 
	const deleteFilesMutation = useMutation(deleteChoiceFileInfo, {
		onSuccess: (data) => {
			console.log('파일 삭제 성공')
            refetch()
		},
		// 업로드 실패 시 실행되는 함수. 에러 메시지를 출력하고 결과 목록에 실패한 업로드 정보를 추가한다.
		onError: (error) => {
			console.error("파일 삭제 실패:", error);
		},
	})

	// 폴더 전체 삭제 Mutaion 
	const deleteFolderMutation = useMutation(deleteFileInfo, {
		onSuccess: (data) => {
			console.log('폴더 삭제 성공', data)
			refetch()
		},
		// 업로드 실패 시 실행되는 함수. 에러 메시지를 출력하고 결과 목록에 실패한 업로드 정보를 추가한다.
		onError: (error) => {
			console.error("폴더 삭제 실패:", error);
		},
	})

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

	// 파일 목록 날짜별로 바꾸기
	useEffect(() => {
		refetch()
	}, [toDay])

	// 날짜 가져오기 및 max 속성 설정
	useEffect(() => {
		const today = new Date();
		const year = today.getFullYear();
		const month = ('0' + (today.getMonth() + 1)).slice(-2); 
		const day = ('0' + today.getDate()).slice(-2);

		// 날짜 포맷팅
		const formattedDate = `${year}-${month}-${day}`;
		const formattedToday = `${year}/${month}/${day}`;

		setDateValue(formattedDate);
		setToDay(formattedToday);
		setMaxDate(formattedDate);

	}, []);

    // maxDate 값이 변경될 때마다 max 속성 업데이트
	useEffect(() => {
		if (dateInputRef.current && maxDate) {
			dateInputRef.current.setAttribute('max', maxDate);
		}
	}, [maxDate]);
	
	// 데이터 
    useEffect(() => {
    }, [data])

	// 삭제 파일
	const [folders, setFolders] = useState([])

	// 삭제 파일 목록 추가 삭제 이벤트
	const handleChangeCheckbox = (checked, path, idx) => {
		if(checked) {
			setFolders((prev) => [...prev, path])
		} else {
			setFolders((prev) => prev.filter((item, index) => index !== idx));
		}
	}

	// 삭제 파일 목록 확인용
	useEffect(() => {
		console.log(folders)
	}, [folders])

	// 선택 파일 삭제 이벤트
	const handleDeleteFile = () => {
		deleteFilesMutation.mutate({
			requestBody: {
				files: folders,
			}
		})
	}

	// 전체 파일 삭제 이벤트 
	const handleDeleteFolder = () => {
		deleteFolderMutation.mutate ({
			requestBody: {
                folderPath: `/uploads/${toDay}`,
            }
		})
	}

	// 날짜 테스트
	const handleDateTest = (e) => {
		setDateValue(e.target.value)
		setToDay(e.target.value.replace(/-/gi, '/'))
	}

	// 이거 말고 따로 해볼만한 게 있을까요..>?
	return (
		<div>
			<h1>파일 멀티 업로드</h1>
			<input
				type="file"
				multiple
				onChange={handleFileChange} // 파일 선택 시 handleFileChange 실행
			/>
			<button
			    type="button"
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
			<div style={{ width: '100%' }}>
				<input 
					ref={dateInputRef}
					value={dateValue}
					type="date" 
					onChange={(e) => handleDateTest(e)} />
			</div>
			<button type="button" onClick={handleDeleteFile}>
				선택 삭제
			</button>

			<button style={{ marginLeft: '10px' }} type="button" onClick={handleDeleteFolder}>
				전체 삭제
			</button>
            <ul>
                {
					data &&
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
								
								<input 
									type="checkbox" 
									checked={folders.includes(item.filePath)}
									onChange={(e) => handleChangeCheckbox(e.target.checked, item.filePath, idx)}
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