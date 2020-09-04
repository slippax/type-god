import React from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../config/firebaseConfig";
import Title from "../views/titlemenu/title";
import Menu from "../views/titlemenu/menu";
import Login from "../views/login/login";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const updateName = () => {
  let name = {
    displayName: "",
  };
  name.displayName = prompt("Please enter your display name");
  console.log(name.displayName);
  if (name.displayName !== null) {
    firebase.auth().currentUser.updateProfile(name);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }
};

const Auth = (props) => {
  const { user, signOut, signInWithGoogle } = props;
  return (
    <div>
      <Title />
      {user ? (
        <div>
          <Menu
            name={user.displayName}
            signout={signOut}
            editname={() => updateName()}
          />
        </div>
      ) : (
        <Login signin={signInWithGoogle} />
      )}
    </div>
  );
};

export default withFirebaseAuth({ providers, firebaseAppAuth })(Auth);
