import { User } from "firebase/auth";
import { FC } from "react"
import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap"
import { BsJournalBookmarkFill } from "react-icons/bs"
import { SignIn } from "./SignIn";
import { UserMenu } from "./UserMenu";

export const Navbar: FC<{ user?: User | null }> = (props) => {
    let signInOut;
    if (props.user) {
        signInOut = <UserMenu photoURL={props.user.photoURL} />;
    } else {
        signInOut = <SignIn />
    }

    return (
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
    );
};