import { FC, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app, auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { getFirestore, collection, FirestoreDataConverter, QueryDocumentSnapshot, WithFieldValue, DocumentData, SnapshotOptions, addDoc, Timestamp } from "firebase/firestore";

function App() {
  const [user] = useAuthState(auth);

  if (user) {
    return (
      <>
        <SignOut />
        <UserInfo user={user}/>
        <NotesList user={user}/>
        <NoteEditor user={user}/>
      </>
    );
  } else {
    return (
      <>
        <SignIn />
      </>
    );
  }
}

const SignIn: FC = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  }

  return (
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

const SignOut: FC = () => {
  return (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

const NoteEditor: FC<{ user: User }> = (props) => {
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

interface Note {
  content: string;
  created: Timestamp
}

const NotesList: FC<{ user: User }> = (props) => {
  const notesRef = collection(getFirestore(app), 'users', props.user.uid, 'notes');
  const [notes] = useCollectionData(notesRef);

  // const converter: FirestoreDataConverter<Note> = {
  //   toFirestore(note: WithFieldValue<Note>): DocumentData {
  //     return note;
  //   },
  //   fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Note {
  //     return snapshot.data(options) as Note;
  //   }
  // };
  // const [notes] = useCollectionData(notesRef.withConverter(converter));
  // TODO figure out how to use FirestoreDataConverter

  return (
    <>
      {/* {notes && notes.map(note => <Note note={note}/>)} */}
      {notes && notes.map(note => <Note note={note as Note} />)}
    </>
  )
}

const Note: FC<{ note: Note }> = (props) => {
  return (
    <>
      <p>{props.note.content}</p>
    </>
  )
}

const UserInfo: FC<{ user: User }> = (props) => {
  return (
    <>
      <p>{props.user.displayName}</p>
      <p>{props.user.email}</p>
    </>
  )
}

export default App;