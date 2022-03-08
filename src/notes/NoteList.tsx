import { User } from "firebase/auth";
import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { Note } from "./Note";

interface NotesListProps {
    user: User,
    notes?: Note[],
    activeNote?: Note,
    setActiveNote: React.Dispatch<React.SetStateAction<Note | undefined>>
}

export const NotesList: FC<NotesListProps> = (props) => {
    const list = (props.notes)?.map(note =>
        <ListGroup.Item
            onClick={() => props.setActiveNote(note)}
            key={note.id}
            active={note.id === props.activeNote?.id}
            action>
            {note.name}
        </ListGroup.Item>
    );

    return (
        <>
            <ListGroup>
                {list}
            </ListGroup>
        </>
    )
}