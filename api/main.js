import { TryRequestGet, TryRequestPost, TryRequestDelete, TryRequestPut } from "@utils/TryRequest";


const getFileInfo = async () => {
    try {
        const response = await TryRequestGet('https://api.bytescale.com/v2/accounts/FW25cG7/uploads')
        if(!response.ok) {
            throw new Error('Failed to get file')
        }
        const data = await response.json();
        return data; 
    } catch (err) {
        console.log('error :', err)
    }
} 

const postFileInfo = async (formData) => {
    try {
        const response = await TryRequestPost('https://api.bytescale.com/v2/accounts/FW25cG7/uploads/form_data', formData)
        if(!response.ok) {
            throw new Error('Failed to post file')
        }
        const data = await response.json();
        return data; 
    } catch (err) {
        console.log('error :', err)
    }
} 

// const deleteFileInfo = async (key) => {
//     try {
//         const response = await TryRequestDelete(`https://api.bytescale.com/v2/accounts/FW25cG7/uploads/${key}`)
//         if(!response.ok) {
//             throw new Error('Failed to delete file')
//         }
//         const data = await response.json();
//         return data
//     } catch (err) {
//         console.log('error :', err)
//     }
// }

// const putFileInfo = async (key, formData) => {
//     try {
//         const response = await TryRequestPut(`https://api.bytescale.com/v2/accounts/FW25cG7/uploads/${key}`, formData);

//         const data = await response.json(); // 여기에서 JSON 파싱
//         return data;
//     } catch (err) {
//         console.log('error:', err);
//     }
// };

export {
    postFileInfo,
    getFileInfo,
    // deleteFileInfo,
    // putFileInfo
}