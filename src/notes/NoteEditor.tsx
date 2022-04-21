import { addDoc, CollectionReference, Timestamp, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { FormControl } from "react-bootstrap";
import { Note } from "./Note";
import { marked  } from "marked";
import DOMPurify from "dompurify";

interface NoteEditorProps {
    activeNote: Note,
    notesRef: CollectionReference<Note>,
    setActiveNote: React.Dispatch<React.SetStateAction<Note | undefined>>
}

export const NoteEditor: FC<NoteEditorProps> = (props) => {
    const [htmlPreview, setHtmlPreview] = useState('');
    
    const onContentChanged = async (newContent: string) => {
        if (!props.activeNote) return;

        const newNote = {...props.activeNote};
        newNote.content = newContent;
        props.setActiveNote(newNote);

        // Update note on firestore
        if (newNote.ref) {
            await updateDoc(newNote.ref, {
                content: newContent,
                lastModified: Timestamp.now()
            });
        } else {
            await addDoc(props.notesRef, newNote);
        }

        // Update html preview
        const rawHtml = marked.parse(newContent);
        setHtmlPreview(DOMPurify.sanitize(rawHtml, { USE_PROFILES: { html: true } }));
    };

    return (
        <>
            <FormControl
                as="textarea"
                onChange={(e) => onContentChanged(e.target.value)}
                value={props.activeNote.content}
            />
            <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
        </>
    );
}