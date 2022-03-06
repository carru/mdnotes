import { User } from "firebase/auth";
import { collection, getFirestore, Timestamp, addDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { app } from "../firebase";
import { Note } from "./Note";

export const NoteEditor: FC<{ user: User }> = (props) => {
    const [content, setContent] = useState('');
    const notesRef = collection(getFirestore(app), 'users', props.user.uid, 'notes');

    const saveNote = async (e: any) => {
        e.preventDefault();


        const note: Note = {
            content,
            created: Timestamp.now()
        }
        await addDoc(notesRef, note);

        setContent('');
    }

    return (
        <>
            <form onSubmit={saveNote}>
                <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Note editor" />
                <button type="submit" disabled={!content}>Save</button>
            </form>
        </>
    )
}