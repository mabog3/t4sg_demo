import React, { useContext } from "react";
import { Router } from "@reach/router";
import Login from "./login";
import Register from "./register";
import Profile from "./Profile";
import { UserContext } from "./providers/UserProvider"

//import PasswordReset from "./PasswordReset";

const Home = () => {
    const user = useContext(UserContext);
    return (
        user ?
        <Profile />
      :
        <Router>
            <Register path="Register" />
            <Login path="/" />
        </Router>
          
  )
}
export default Home;