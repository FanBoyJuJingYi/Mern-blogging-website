//importing tools
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Maker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { uploadImage } from "../common/aws";

const uploadImageByFile = (e) => {
  return uploadImage(e).then(url => {
    if (url) {
      return {
        success: 1,
        file: { url }
      }
    }
  })
}

const uploadImageByUrl = (e) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e)
    }
    catch (err) {
      reject(err)
    }
  })
  return link.then(url => {
    return {
      success: 1,
      file: { url }
    }
  })
}

export const tools = {
  embed: Embed,
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading... ",
      levels: [2, 3],
      defaultLevel: 2
    }
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile,
      }
    }

  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  maker: Maker,
  inlineCode: InlineCode
}