import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { auth } from "../firebase";

export const SignIn: FC = () => {
    const signInWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider());
    }

    return <Button variant="outline-light" onClick={signInWithGoogle}>Sign In</Button>;
}