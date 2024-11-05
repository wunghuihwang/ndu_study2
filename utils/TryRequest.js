const entries  = obj => Object.entries(obj).filter(([,val]) => (val ?? null) !== null);
export const TryRequestGet = async (url) => {
    // 아직 업로드도 못했습니다... 
    // https://www.bytescale.com/docs/upload-api/ListUploadParts
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: Object.fromEntries(entries({
                "Authorization": `Bearer public_FW25cG7BUsgE3qandStPEpcPjDag`,
            }))
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}


export const TryRequestPost = async (url, body) => {
    // https://www.bytescale.com/docs/upload-api/FormDataUpload
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: Object.fromEntries(entries({
                "Authorization": `Bearer public_FW25cG7BUsgE3qandStPEpcPjDag`
            }))
        });
        return await response.json();
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