import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore";

export interface Note {
    id?: string;
    ref?: DocumentReference<DocumentData>;
    name?: string;
    content?: string;
    created?: Timestamp
}