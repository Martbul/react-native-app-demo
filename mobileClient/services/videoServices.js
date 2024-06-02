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
