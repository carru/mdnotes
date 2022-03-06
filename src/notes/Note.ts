import { Timestamp } from "firebase/firestore";

export interface Note {
    content: string;
    created: Timestamp
}