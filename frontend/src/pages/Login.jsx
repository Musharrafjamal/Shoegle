import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, user, logout } = useAuth0();

  console.log(user)


  return (
    <div>
      <h1>Login</h1>
      {user ? <span>Hello {user.name}</span> : <span>Hello</span>}
      {user ? (
        <button onClick={() => logout()}>Log out</button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </div>
  );
};

export default Login;
