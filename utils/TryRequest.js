const entries  = obj => Object.entries(obj).filter(([,val]) => (val ?? null) !== null);
export const TryRequestGet = async (url, params) => {
    const query    = entries(params.querystring ?? {})
    .flatMap(([k,v]) => Array.isArray(v) ? v.map(v2 => [k,v2]) : [[k,v]])
    .map(kv => kv.join("=")).join("&");
    try {
        const response = await fetch(`${url}${query.length > 0 ? "?" : ""}${query}`, {
            method: "GET",
            headers: Object.fromEntries(entries({
              "Authorization": `Bearer secret_FW25cG7D1C7f5ZmCRzgZFoy9n8Vk`,
            }))
          });
          const result = await response.json();
          if (Math.floor(response.status / 100) !== 2)
            throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
          return result;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}


export const TryRequestPost = async (url, params) => {
    try {
        const query = entries(params.querystring ?? {})
		.flatMap(([k, v]) => (Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]))
		.map((kv) => kv.join("="))
		.join("&");
        const formData = new FormData();
        formData.append("file", params.requestBody, params.originalFileName);
        const response = await fetch(`${url}${query.length > 0 ? "?" : ""}${query}`, {
            method: "POST",
            body: formData,
            headers: Object.fromEntries(
                entries({
                    "Authorization": `Bearer public_FW25cG7BUsgE3qandStPEpcPjDag`, // 인증 헤더에 API 키 추가
                    "X-Upload-Metadata": JSON.stringify(params.metadata), // 메타데이터를 헤더에 JSON 형식으로 추가
                }),
            ),
        });
        // 응답을 JSON으로 변환하고 오류가 있을 경우 예외를 발생시킨다.
        const result = await response.json();
        if (Math.floor(response.status / 100) !== 2) throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`); // 응답 코드가 2xx가 아닐 경우 오류 발생
        return result; // 업로드 결과 반환
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}

export const TryRequestPut = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: body
        })
        return response;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
}

export const TryRequestDelete = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, 
            }
        })
        return response;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}