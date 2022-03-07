import { User } from "firebase/auth";
import { collection, getFirestore, FirestoreDataConverter, WithFieldValue, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app } from "../firebase";
import { Note } from "./Note";

interface NotesListProps {
    user: User,
    activeNoteId?: string
}

const converter: FirestoreDataConverter<Note> = {
    toFirestore(note: WithFieldValue<Note>): DocumentData {
        return {
            name: note.name,
            content: note.content,
            created: note.created
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Note {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            ref: snapshot.ref,
            name: data.name,
            content: data.content,
            created: data.created
        };
    }
};

export const NotesList: FC<NotesListProps> = (props) => {
    const notesRef = collection(getFirestore(app), 'users', props.user.uid, 'notes').withConverter(converter);
    const [notes] = useCollectionData(notesRef);

    const list = (notes)?.map(note =>
        <ListGroup.Item key={note.id} action>{note.name}</ListGroup.Item>
    );

    return (
        <>
            <ListGroup>
                {list}
            </ListGroup>
        </>
    )
}