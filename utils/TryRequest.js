const token = 'NYAOC76.0BZSRD9-J5S48SY-HFN8HW1-YFQNBY3';
export const TryRequestGet = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        return response
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}


export const TryRequestPost = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: body
        })
        return response;
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