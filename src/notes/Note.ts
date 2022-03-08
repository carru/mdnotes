import { DocumentData, DocumentReference, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp, WithFieldValue } from "firebase/firestore";

export interface Note {
    id?: string;
    ref?: DocumentReference<DocumentData>;
    name?: string;
    content?: string;
    created?: Timestamp
}

export const converter: FirestoreDataConverter<Note> = {
    toFirestore(note: WithFieldValue<Note>): DocumentData {
        return {
            name: note.name,
            content: note.content,
            created: note.created
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Note {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            ref: snapshot.ref,
            name: data.name,
            content: data.content,
            created: data.created
        };
    }
};