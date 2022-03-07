import { User } from "firebase/auth";
import { FC } from "react";
import { NoteEditor } from "./NoteEditor";
import { NotesList } from "./NoteList";

export const NotesView: FC<{ user: User }> = (props) => {
    let activeNoteId: string;
    
    return (
        <>
            <NotesList user={props.user}/>
            <NoteEditor />
        </>
    )
}