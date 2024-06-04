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

    console.log("thumbnailUrl", thumbnailUrl);
    console.log("videoUrl", videoUrl);

   
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


// export const createVideo = async (form) => {
//   try {
//     const [thumbnailUrl, videoUrl] = await Promise.all([
//       uploadFileToCloud(form.thumbnail, "image"),
//       uploadFileToCloud(form.video, "video"),
//     ]);

//     console.log("thumbnailUrl", thumbnailUrl);
//     console.log("videoUrl", videoUrl);

//     const formData = new FormData();
//     formData.append("video", videoUrl); // Use the URL instead of the file
//     formData.append("thumbnail", thumbnailUrl); // Use the URL instead of the file
//     formData.append("title", form.title);
//     formData.append("prompt", form.prompt);
//     formData.append("creator", form.creator);

//     console.log(formData);

//     const response = await fetch(`${baseUrl}/videos/createVideo`, {
//       method: "POST",
//       body: JSON.stringify(formData), // Ensure the body is formatted correctly
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const result = await response.json();

//     if (response.ok) {
//       console.log("new video", result);
//       return result;
//     } else {
//       console.error("response", result);
//       throw new Error(result);
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };



