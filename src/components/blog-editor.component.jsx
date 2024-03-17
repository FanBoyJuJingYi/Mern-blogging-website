import { Link } from "react-router-dom";
import logo from "../imgs/logo.png"
import defaulBanner from "../imgs/blog banner.png"
import AnimationWrapper from "../common/page-animation";
import { uploadImage } from "../common/aws";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const BlogEditor = () => {
  let blogBannerRef = useRef();

  const handleBannerUpLoad = (e) => {
    let img = e.target.files[0];
    if (img) {

      let loadingToast = toast.loading("Uploadding...");

      uploadImage(img).then((url) => {
        if (url) {
          console.log('received url', url)
          toast.dismiss(loadingToast)
          toast.success("Uploaded👌");
          blogBannerRef.current.src = url
        }
      })
        .catch(err => {
          toast.dismiss(loadingToast);
          toast.error("Upload failed: " + err.message); // Sử dụng thông báo lỗi từ thuộc tính `message` của đối tượng lỗi

        })
    }
  }
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>

      </nav>
      <Toaster />
      <AnimationWrapper>

        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey ">
              <label htmlFor="uploadBanner">
                <img
                  ref={blogBannerRef}
                  src={defaulBanner}
                  className="z-20" />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpLoad} />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  )
}

export default BlogEditor;