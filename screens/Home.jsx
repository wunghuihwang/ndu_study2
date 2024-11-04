import { getFileInfo, postFileInfo, deleteFileInfo, putFileInfo } from "@api/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";

const HomeScreen = () => {

    /*
        문제 
        // 1.PUT 사용 시 에러남 보내주는 방법을 바꿔 해결
        1. GET 함수에서 삭제 제외 변경 추가 시 404 에러   
    */ 
    // 파일데이터
	const [pushFileValue, setPushFileValue] = useState(null);

    // 파일 보내기
	const mutation = useMutation({
		mutationFn: (pushFileValue) => postFileInfo(pushFileValue),
	})

    // 파일 삭제하기 
    const deleteMutation = useMutation({
        mutationFn: (key) => deleteFileInfo(key),
    })

    // 파일 변경하기
    const putMutation = useMutation({
        mutationFn: ({key, formData}) => putFileInfo(key, formData)
    })

    // 파일 데이터 받기
    const { data, refetch, isLoading, isError } = useQuery({
        queryKey: ['DATA_SSS'], // 일단 임시로 넣었습니다. 
        queryFn: getFileInfo,
        select: data => data.map(item => ({ id: item.id, name: item.name, key: item.key })), // 필요한 옵션만
        refetchOnWindowFocus: true, // 데이터 실시간 업데이트
        retry: 3, // 재시도
    }) 
    console.log(data)
    // 클릭 이벤트 파일 데이터 보내기
	const pushData = (event) => {
        event.preventDefault();
        if (pushFileValue) {
            const formData = new FormData();
            formData.append('file', pushFileValue);
            mutation.mutate(formData, {
                onSuccess: (data) => {
                    alert('파일 보내기 성공')
                    console.log(data)
                    refetch()
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

    // 파일 데이터 추가
    const handleChangeFileValue = (e) => {
        setPushFileValue(e.target.files[0]); 
    };

    // 파일 데이터 삭제
    const handleDelete = (key) => {
        deleteMutation.mutate(key, {
            onSuccess: (data) => {
                alert('파일 삭제 성공')
                console.log(data)
                refetch()
            },
            onError: (error) => {
                console.log('파일 삭제 실패', error)
                alert('파일 삭제 실패')
            }
        });
    }

    // 파일 데이터 변경
    const handleChange = (key) => {
        if (!pushFileValue || !key) {
            return;
        }
        const formData = new FormData();
        formData.append('file', pushFileValue);

        
        putMutation.mutate({key, formData}, {
            onSuccess: (data) => {
                alert('파일 변경 성공')
                console.log(data)
            },
            onError: (error) => {
                console.log('파일 변경 실패', error)
                alert('파일 변경 실패')
            }
        });
    }
	return (
        <>
            <h1>File API 연습</h1>
            <form action="">
                <input type="file" onChange={handleChangeFileValue} />
                <button onClick={pushData}>
                    Go Test (with Querystring)
                </button>
            </form>
            {
                isLoading && <p>Loading...</p> ||
                isError && <p>isError...</p> ||
                !isLoading && !isError &&
                <ul className="file_wrap">
                    {
                        data && 
                        data.map((item) => {
                            return (
                                <li key={item.id}>
                                    <img src={item.name} alt={item.name} />
                                    <button onClick={() => handleDelete(item.key)}>삭제</button>
                                    <button onClick={() => handleChange(item.key)}>변경</button>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </>
	);
};
export default HomeScreen;
