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






// export const createVideo = async(form) => {
//     console.log('form', form);
    
//     const formData= new FormData();
//     formData.append('video', form.video);
//     formData.append('thumbnail', form.thumbnail);
//     formData.append('title', form.title);
//     formData.append('prompt', form.prompt);
//     console.log(formData);

//     const response = await fetch(`${baseUrl}/videos/createVideo`, {
//         method: 'POST',
//         body: JSON.stringify(formData),
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });
    

//     if (response.error) {
//         console.log('response', response);
//         throw new Error(response);
//     }
   
//     console.log("new video",response);

//     return response
// }

export const uploadFileToCloud = async (file, type) => {
    console.log('uploading files to firebase');
    if (!file) return;



 const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
    
    console.log('asset',asset);
    
    const storage = getStorage(app);
    const folder = type === "image" ? "demoAppImages/" : "demoAppVideos/"
   
    const fileName = new Date().getTime() + asset.name;
    const storageRef = ref(storage, folder + fileName);
    const response = await fetch(asset.uri);
    const blob = await response.blob();

    // Create the upload task
    const uploadTask = uploadBytesResumable(storageRef, blob);

uploadTask.on(
  "state_changed",
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        resolve(downloadURL);
    });
  }
);
}


export const createVideo = async (form) => {
 
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
          uploadFileToCloud(form.thumbnail, "image"),
          uploadFileToCloud(form.video, "video"),
        ]);



        //! i am not getting the thumbnail and video url
        
        //!trqbva chrez authContext user.email da vzemesh creator ot create.jsx 
        //!i da go appendnesh kym formata za uspeshna zaqvka za kriejtvane na vide + da podadesh na mondodb referenciq kym kaènite vyv firebase videa
    console.log("thumbnailUrl", thumbnailUrl);
    console.log("videoUrl", videoUrl);
  const formData = new FormData();
  formData.append("video", form.video);
  formData.append("thumbnail", form.thumbnail);
  formData.append("title", form.title);
  formData.append("prompt", form.prompt);
  console.log(formData);

  const response = await fetch(`${baseUrl}/videos/createVideo`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (response.error) {
    console.log("response", response);
    throw new Error(response);
  }

  console.log("new video", response);

        
        
  return response;
    } catch (error) {
        throw new Error(error);
    }
   
};



