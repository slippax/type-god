import React from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../config/firebaseConfig";
import Title from "../views/titlemenu/title";
import Menu from "../views/titlemenu/menu";
import Login from "../views/login/login";
import classes from "./auth.module.css";
import Zoom from "react-reveal/Zoom";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
let name = {
  displayName: "",
};
function setName() {
  return new Promise((resolve, reject) => {
    name.displayName = prompt("Please enter your display name");
    if (name.displayName !== null && name.displayName !== "") {
      firebase.auth().currentUser.updateProfile(name);
      resolve("name completed");
    } else {
      reject("name not completed");
    }
  });
}

async function showName() {
  await setName().then((response) => {
    console.log(response);
    document.getElementById("name").innerHTML = name.displayName;
  });
}

const Auth = (props) => {
  const { user, signOut, signInWithGoogle } = props;
  return (
    <Zoom>
      <div className={classes.appwrapper}>
        <Title />
        {user ? (
          <div>
            <Menu
              name={user.displayName}
              signout={signOut}
              editname={() => showName()}
            />
          </div>
        ) : (
          <Login signin={signInWithGoogle} />
        )}
      </div>
    </Zoom>
  );
};

export default withFirebaseAuth({ providers, firebaseAppAuth })(Auth);
