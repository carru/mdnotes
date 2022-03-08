import { User } from "firebase/auth";
import { addDoc, collection, getFirestore, Timestamp, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app } from "../firebase";
import { converter, Note } from "./Note";
import { NoteEditor } from "./NoteEditor";
import { NotesList } from "./NoteList";

interface NotesViewProps {
    user: User
}

export const NotesView: FC<NotesViewProps> = (props) => {
    const [activeNote, setActiveNote] = useState<Note | undefined>(undefined);

    const notesRef = collection(getFirestore(app), 'users', props.user.uid, 'notes').withConverter(converter);
    const [notes] = useCollectionData(notesRef);

    const onContentChanged = async (newContent: string) => {
        if (!activeNote) return;

        const newNote = {...activeNote};
        newNote.content = newContent;
        setActiveNote(newNote);

        // Update note on firestore
        if (newNote.ref) {
            await updateDoc(newNote.ref, {
                content: newContent,
                lastModified: Timestamp.now()
            });
        } else {
            await addDoc(notesRef, newNote);
        }
    };

    return (
        <>
            <NotesList user={props.user} activeNote={activeNote} setActiveNote={setActiveNote} notes={notes}/>
            {activeNote && <NoteEditor activeNote={activeNote} onContentChanged={onContentChanged} />}
        </>
    );
}