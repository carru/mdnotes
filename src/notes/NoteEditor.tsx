import { FC } from "react";
import { Note } from "./Note";

export const NoteEditor: FC<{ note?: Note }> = (props) => {
    return (
        <>
            <input value={props.note?.content} placeholder="Note editor" />
        </>
    )
}