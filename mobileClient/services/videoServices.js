import { baseUrl, postRequest, getRequest } from "../utils/request";
export const getAllVideos = async () => {
    const response = await getRequest(
        `${baseUrl}/videos/getAllVideos`,
    );

    if (response.error) {
        console.log('response', response);
        throw new Error(response);
    }

    return response
}


export const getLatestVideos = async () => {
    const response = await getRequest(
        `${baseUrl}/videos/getLatestVideos`,
    );

    if (response.error) {
        console.log('response', response);
        throw new Error(response);
    }

    return response
}
export const searchVideos = async (query) => {
    const response = await getRequest(
        `${baseUrl}/videos/serchVideos?videoName=${query}`,
    );

    if (response.error) {
        console.log('response', response);
        throw new Error(response);
    }

    return response
}
export const getAllUserVideos = async(userEmail) => {
    const response = await postRequest(
        `${baseUrl}/videos/getAllUserVideos`,

        JSON.stringify({userEmail})
    );

    if (response.error) {
        console.log('response', response);
        throw new Error(response);
    }
   
    console.log("UserVideos",response);

    return response
}



export const createVideo = async(form) => {
    console.log('form',form);
    const formData= new FormData();
    formData.append('video', form.video);
    formData.append('thumbnail', form.thumbnail);
    formData.append('title', form.title);
    formData.append('prompt', form.prompt);
    console.log(formData);

    const response = await fetch(`${baseUrl}/videos/createVideo`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    

    if (response.error) {
        console.log('response', response);
        throw new Error(response);
    }
   
    console.log("new video",response);

    return response
}


// export const createVideo = async (form) => {
//     const formData = new FormData();
//     formData.append('video', form.video);
//     formData.append('thumbnail', form.thumbnail);
//     formData.append('title', form.title);
//     formData.append('prompt', form.prompt);

//     try {
//         const response = await fetch(`${baseUrl}/videos/createVideo`, {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
        
//         if (!response.ok) {
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.message || 'Error creating video');
//         }

//         const responseData = await response.json();
//         console.log('New video:', responseData);
//         return responseData;
//     } catch (error) {
//         console.error('Error creating video:', error);
//         throw error;
//     }
// };



