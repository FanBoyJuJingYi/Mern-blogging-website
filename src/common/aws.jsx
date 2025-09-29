import axios from "axios";

export const uploadImage = async (img) => {
  let imgUrl = null;
  await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
    .then(async ({ data: { uploadURL } }) => {
      const baseUrl = uploadURL.split('?')[0];
      console.log(uploadURL);
      let upload = await axios.put(uploadURL, img, {
        headers: {
          "Content-Type": img.type,
        },
      }).then(() => baseUrl)
        .catch(err => {

          throw new Error(err.message);
        })
      imgUrl = upload;
    })
  return imgUrl;
}
