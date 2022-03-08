import { User } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
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

    const onContentChanged = (newContent: string) => {
        if (!activeNote) return;

        const newNote = {...activeNote};
        newNote.content = newContent;
        setActiveNote(newNote);
    };

    return (
        <>
            <NotesList user={props.user} activeNote={activeNote} setActiveNote={setActiveNote} notes={notes}/>
            {activeNote && <NoteEditor activeNote={activeNote} onContentChanged={onContentChanged} />}
        </>
    );
}