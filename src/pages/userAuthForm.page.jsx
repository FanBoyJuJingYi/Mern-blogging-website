// import { useRef } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate, json } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";
import { storeInSession } from "../common/session";
import { useContext } from "react";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";

const UserAuthFrom = ({ type }) => {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  const userAuthThroughSever = (serverRouter, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRouter, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRouter = type == "sign-in" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    // formData
    let form = new FormData(formElement);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    // from validation
    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Fullname should be atleast 3 characters long");
      }
    }
    if (!email.length) {
      return toast.error("Email Entered");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be atleast 6 characters long and contain atleast 1 uppercase letter, 1 lowercase letter and 1 number"
      );
    }
    userAuthThroughSever(serverRouter, formData);
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();

    authWithGoogle()
      .then((user) => {
        let serverRouter = "/google-auth";
        let formData = {
          access_token: user.accessToken,
        };
        userAuthThroughSever(serverRouter, formData);
      })
      .catch((err) => {
        toast.err("trouble login throught google");
        return console.log(err);
      });
  };
  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form id="formElement" className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type == "sign-in" ? "Welcome back" : "Join us today"}
          </h1>

          {type != "sign-in" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}
          <InputBox
            name="email"
            type="Email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />
          <button
            className="btn-dark center mt-14"
            type="submit"
            onClick={handleSubmit}
          >
            {type.replace("-", " ")}
          </button>

          <div className="realitve w-full flex items-center gap-2 my-10 opacity-10 uppercase dark-grey text-black font-bold">
            <hr className="w-1/2  border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
            onClick={handleGoogleAuth}
          >
            <img src={googleIcon} className="w-5" />
            Continue with Google
          </button>
          {type == "sign-in" ? (
            <p className="text-dark-grey text-xl text-center mt-6">
              Don't have account ?
              <Link to="/signup" className="underline ml-1 text-black text-xl">
                Join us today{" "}
              </Link>
            </p>
          ) : (
            <p className="text-dark-grey text-xl text-center mt-6">
              Already a member ?
              <Link to="/signin" className="underline ml-1 text-black text-xl">
                Sign in here{" "}
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};
export default UserAuthFrom;
