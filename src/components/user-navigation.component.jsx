import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom"
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";
const UserNavigationPanel = () => {

  const { userAuth: { username, isAdmin }, setUserAuth } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });

  }

  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <div className="right-0 absolute bg-white border w-60 border-grey duration-200">
        {
          isAdmin ? <Link to="/editor" className="flex gap-2 pl-8 py-4 link md:hidden">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link> : ""
        }
        <Link to={`/user/${username}`} className="link pl-8 py-4">
          Profile
        </Link>
        <Link to="/dashboard/blogs" className="link py-4 pl-8">
          Dashboard
        </Link>
        <Link to="/settings/edit-profile" className="link py-4 pl-8">
          Settings
        </Link>
        <span className="absolute border-t border-grey w[100%]">
        </span>

        <button className="text-left p-4 pl-8 hover:bg-grey w-full"
          onClick={signOutUser}
        >
          <h1 className="text-bold text-xl mg-1">SignOut</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>

      </div>

    </AnimationWrapper>
  )

}

export default UserNavigationPanel;

