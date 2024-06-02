import { baseUrl, postRequest,getRequest} from "../utils/request";



export const getAllVideos = async () => {
 console.log('getAllVideos');
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
