import { baseUrl, postRequest, getRequest } from "../utils/request";
export const getAllVideos = async () => {
    
    const response = await getRequest(
        `${baseUrl}/videos/getAllVideos`,

    );


    if (response.error) {
        console.log('response', response);
        throw new Error(response);
    }
    console.log('response', response);


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
    console.log('response', response);

    return response
}
export const searchVideos = async (query) => {
   // console.log(query);
    const response = await getRequest(
        `${baseUrl}/videos/serchVideos?videoName=${query}`,

    );

    if (response.error) {
        console.log('response', response);
        throw new Error(response);
    }
    //console.log('response', response);

    return response
}
