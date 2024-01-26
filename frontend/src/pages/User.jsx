import React from "react";
import Nav from "../components/Nav";
import { useAuth0 } from "@auth0/auth0-react";

const User = () => {
  const { user, logout } = useAuth0();
  console.log(user)
  return (
    <div>
      <Nav alternate={true} />
      <div className="h-96 flex justify-center items-center">
        {user !== undefined && (
          <div className="flex flex-col border py-8 px-12">
            <img src={user.picture} alt="" />
            <h1 className="text-xl ">{user.name}</h1>
            <button
              onClick={() => {
                logout();
              }}
              className="bg-red-500 px-6 py-2 "
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
