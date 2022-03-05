import React, { FC } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      { user ? <SignOut /> : <SignIn />}
      <UserInfo user={user}></UserInfo>
    </>
  );
}

const SignIn: FC = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  }

  return (
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

const SignOut: FC = () => {
  return (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

const UserInfo: FC<{ user?: User | null }> = (props) => {
  let displayName, email;
  if (props.user) {
    displayName = props.user.displayName;
    email = props.user.email ? props.user.email : '';
  }

  return (
    <>
      <p>{displayName}</p>
      <p>{email}</p>
    </>
  )
}

export default App;