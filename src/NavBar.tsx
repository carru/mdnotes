import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { FC } from "react"
import { Button, Container, Nav, Navbar as BsNavbar, NavDropdown } from "react-bootstrap"
import { BsJournalBookmarkFill } from "react-icons/bs"
import { BiUserCircle } from "react-icons/bi";
import { auth } from "./firebase";

export const Navbar: FC<{ user?: User | null }> = (props) => {
    let signInOut;
    if (props.user) {
        signInOut = (
            <UserMenu photoURL={props.user.photoURL} />
        );
    } else {
        signInOut = (
            <SignIn />
        );
    }

    return (
        <>
            <BsNavbar bg="dark" variant="dark">
                <Container>
                    <BsNavbar.Brand>
                        <BsJournalBookmarkFill /> {' '} mdnotes
                    </BsNavbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>Drawer</Nav.Link>
                        <Nav.Link>New</Nav.Link>
                    </Nav>
                    <Nav>
                        {signInOut}
                    </Nav>
                </Container>
            </BsNavbar>
        </>
    );
};

const SignIn: FC = () => {
    const signInWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider());
    }

    return (
        <Button variant="outline-light" onClick={signInWithGoogle}>Sign In</Button>
    )
}

const UserMenu: FC<{ photoURL?: string | null }> = (props) => {
    // TODO fix sizing of default user profile picture

    let profileImage;
    if (props.photoURL) {
        profileImage = <img src={props.photoURL} width="32" height="32" className="rounded-circle" />;
    } else {
        profileImage = <BiUserCircle />
    }

    return (
        <NavDropdown
            title={profileImage}
            menuVariant="dark"
        >
            <NavDropdown.Item onClick={() => auth.signOut()}>Sign Out</NavDropdown.Item>
        </NavDropdown>
    )
}