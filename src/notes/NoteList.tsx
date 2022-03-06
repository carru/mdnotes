import { User } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app } from "../firebase";
import { Note } from "./Note";

export const NotesList: FC<{ user: User }> = (props) => {
    const notesRef = collection(getFirestore(app), 'users', props.user.uid, 'notes');
    const [notes] = useCollectionData(notesRef);

    // const converter: FirestoreDataConverter<Note> = {
    //   toFirestore(note: WithFieldValue<Note>): DocumentData {
    //     return note;
    //   },
    //   fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Note {
    //     return snapshot.data(options) as Note;
    //   }
    // };
    // const [notes] = useCollectionData(notesRef.withConverter(converter));
    // TODO figure out how to use FirestoreDataConverter

    return (
        <>
            {/* {notes && notes.map(note => <Note note={note}/>)} */}
            {notes && notes.map(note => <p>{note.content}</p>)}
        </>
    )
}