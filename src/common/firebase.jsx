// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXt2vm_UGCTuttCMDySp4N5ZHPA73V_Nk",
  authDomain: "reat-js-blog-website.firebaseapp.com",
  projectId: "reat-js-blog-website",
  storageBucket: "reat-js-blog-website.appspot.com",
  messagingSenderId: "435988500570",
  appId: "1:435988500570:web:92168d99148bfca9054863"
};

const app = initializeApp(firebaseConfig); //được sử dụng để khởi tạo ứng dụng Firebase với cấu hình được cung cấp trong firebaseConfig. Cấu hình này bao gồm các thông tin như API key, projectId, và authDomain.

//google auth

const auth = getAuth();  // dùng để tạo ra một đối tượng auth, cho phép thực hiện các hoạt động liên quan đến xác thực người dùng, như đăng nhập, đăng ký, và đăng xuất.

const provider = new GoogleAuthProvider();  // cung cấp một cách để xác thực người dùng bằng tài khoản Google. Bằng cách sử dụng GoogleAuthProvider, bạn có thể cho phép người dùng đăng nhập vào ứng dụng của bạn bằng tài khoản Google của họ.

export const authWithGoogle = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user
    })
    .catch((err) => {
      console.log(err)
    })
  return user;
}