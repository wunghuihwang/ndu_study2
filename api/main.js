import { TryRequestGet, TryRequestPost, TryRequestDelete, TryRequestPut } from "@utils/TryRequest";


const getFileInfo = async (parms) => {

    // https://www.bytescale.com/docs/folder-api/ListFolder 
    // folders/list api로 접근해서 가져왔습니다.!
    try {
        const response = await TryRequestGet(`https://api.bytescale.com/v2/accounts/FW25cG7/folders/list`, parms)
        return response; 
    } catch (err) {
        console.log('error :', err)
    }
} 

const postFileInfo = async (params) => {
    try {
        const response = await TryRequestPost('https://api.bytescale.com/v2/accounts/FW25cG7/uploads/form_data', params)
        return response; 
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