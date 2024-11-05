import { getFileInfo, postFileInfo, deleteFileInfo, putFileInfo } from "@api/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";

const HomeScreen = () => {

    // 파일데이터
	const [pushFileValue, setPushFileValue] = useState(null);
	const [pushFileName, setPushFileName] = useState(null);

    // 파일 보내기
	const mutation = useMutation({
		mutationFn: (pushFileValue) => postFileInfo(pushFileValue),
	})

    // // 파일 삭제하기 
    // const deleteMutation = useMutation({
    //     mutationFn: (key) => deleteFileInfo(key),
    // })

    // // 파일 변경하기
    // const putMutation = useMutation({
    //     mutationFn: ({key, formData}) => putFileInfo(key, formData)
    // })

    // // 파일 데이터 받기
    // const { data, refetch, isLoading, isError } = useQuery({
    //     queryKey: ['DATA_SSS'], // 일단 임시로 넣었습니다. 
    //     queryFn: getFileInfo,
    //     select: (data) => {
    //         return data?.map(item => ({
    //             name: item.name ?? '',
    //             key: item.key ?? '',
    //         }));
    //     },
    //     refetchOnWindowFocus: true, // 데이터 실시간 업데이트
    //     retry: 3, // 재시도
    //     onError: (error) => {
    //         console.log('Error fetching data:', error);
    //     },
    // }) 

    
    // 클릭 이벤트 파일 데이터 보내기
	const pushData = (event) => {
        event.preventDefault();
        if (pushFileValue) {
            const formData = new FormData();
            formData.append('file', pushFileValue, pushFileName);
            mutation.mutate(formData, {
                onSuccess: (data) => {
                    alert('파일 보내기 성공')
                },
                onError: (error) => {
                    console.log('파일 보내기 실패', error)
                    alert('파일 보내기 실패')
                }
            }); 
        } else {
            return;
        }

	}

    // // 파일 데이터 추가
    const handleChangeFileValue = (e) => {
        setPushFileValue(e.target.files[0]); 
        console.log(e)
        setPushFileName(e.target.files[0].name);
    };

    // // 파일 데이터 삭제
    // const handleDelete = (key) => {
    //     deleteMutation.mutate(key, {
    //         onSuccess: (data) => {
    //             alert('파일 삭제 성공')
    //             console.log(data)
    //             refetch()
    //         },
    //         onError: (error) => {
    //             console.log('파일 삭제 실패', error)
    //             alert('파일 삭제 실패')
    //         }
    //     });
    // }

    // // 파일 데이터 변경
    // const handleChange = (key) => {
    //     if (!pushFileValue || !key) {
    //         return;
    //     }
    //     const formData = new FormData();
    //     formData.append('file', pushFileValue);

        
    //     putMutation.mutate({key, formData}, {
    //         onSuccess: (data) => {
    //             alert('파일 변경 성공')
    //             console.log(data)
    //         },
    //         onError: (error) => {
    //             console.log('파일 변경 실패', error)
    //             alert('파일 변경 실패')
    //         }
    //     });
    // }
	return (
        <>
            <h1>File API 연습</h1>
            <form action="">
                <input type="file" onChange={handleChangeFileValue} />
                <button onClick={pushData}>
                    Go Test (with Querystring)
                </button>
            </form>
            {/* {
                isLoading && <p>Loading...</p> ||
                isError && <p>isError...</p> ||
                !isLoading && !isError &&
                <ul className="file_wrap">
                    {
                        data &&
                        data.map((item) => {
                            return (
                                <li key={item.key}>
                                    <img src={`https://www.file.io/hM7v/download/${item.key}`} alt={item.name} />
                                    <button onClick={() => handleDelete(item.key)}>삭제</button>
                                    <button onClick={() => handleChange(item.key)}>변경</button>
                                </li>
                            )
                        })
                    } 
                </ul>
            } */}
        </>
	);
};
export default HomeScreen;
