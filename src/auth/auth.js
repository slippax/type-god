import React from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../config/firebaseConfig";
import Title from "../views/titlemenu/title";
import Menu from "../views/titlemenu/menu";
import Login from "../views/login/login";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const Auth = (props) => {
  const { user, signOut, signInWithGoogle } = props;
  return (
    <div>
      <Title />
      {user ? (
        <Menu name={user.displayName} signout={signOut} />
      ) : (
        <Login signin={signInWithGoogle} />
      )}
    </div>
  );
};
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({ providers, firebaseAppAuth })(Auth);
