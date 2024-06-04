import { baseUrl, postRequest, getRequest } from "../utils/request";
import app from '../firebase'
import {getStorage, ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage'
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
   
 //   console.log("UserVideos",response);

    return response
}




export const uploadFileToCloud = async (file, type) => {
  console.log("uploading files to firebase");
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  console.log("asset", asset);

  const storage = getStorage(app);
  const folder = type === "image" ? "demoAppImages/" : "demoAppVideos/";

  const fileName = new Date().getTime() + asset.name;
  const storageRef = ref(storage, folder + fileName);
  const response = await fetch(asset.uri);
  const blob = await response.blob();

  // Create the upload task
  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          })
          .catch(reject);
      }
    );
  });
};

export const createVideo = async (form) => {

  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFileToCloud(form.thumbnail, "image"),
      uploadFileToCloud(form.video, "video"),
    ]);

    
   
let body = form
    body.video = videoUrl;
      body.thumbnail = thumbnailUrl;
      console.log('body',body);

    

    const response = await fetch(`${baseUrl}/videos/createVideo`, {
      method: "POST",
      body: JSON.stringify(body), // Ensure the body is formatted correctly
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      console.log("new video", result);
      return result;
    } else {
      console.error("response", result);
      throw new Error(result);
    }
  } catch (error) {
    throw new Error(error);
  }
};



