import { FC } from "react";
import { FormControl } from "react-bootstrap";
import { Note } from "./Note";

interface NoteEditorProps {
    activeNote: Note,
    onContentChanged: (newContent: string) => void
}

export const NoteEditor: FC<NoteEditorProps> = (props) => {
    return (
        <>
            <FormControl
                as="textarea"
                onChange={(e) => props.onContentChanged(e.target.value)}
                value={props.activeNote.content}
            />
        </>
    );
}