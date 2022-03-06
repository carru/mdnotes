import { FC } from "react";
import { NavDropdown, Image } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { auth } from "../firebase";

export const UserMenu: FC<{ photoURL?: string | null }> = (props) => {
    // TODO fix profile pic size not constrained by parent

    let profileImage;
    if (props.photoURL) {
        profileImage = <Image height="32" roundedCircle={true} src={props.photoURL} />
    } else {
        profileImage = <BiUserCircle />
    }

    return (
        <NavDropdown title={profileImage} menuVariant="dark">
            <NavDropdown.Item onClick={() => auth.signOut()}>Sign Out</NavDropdown.Item>
        </NavDropdown>
    )
}