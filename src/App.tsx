import { FC } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app, auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { getFirestore, collection, FirestoreDataConverter, QueryDocumentSnapshot, WithFieldValue, DocumentData, SnapshotOptions } from "firebase/firestore";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      { user ? <SignOut /> : <SignIn />}
      <UserInfo user={user}></UserInfo>
      <NotesList/>
    </>
  );
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

interface Note {
  content: string;
}

const NotesList: FC = () => {
  const notesRef = collection(getFirestore(app), 'notes');
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
  const [notes] = useCollectionData(notesRef);

  return (
    <>
    {/* {notes && notes.map(note => <Note note={note}/>)} */}
    {notes && notes.map(note => <Note note={note as Note}/>)}
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

const UserInfo: FC<{ user?: User | null }> = (props) => {
  let displayName, email;
  if (props.user) {
    displayName = props.user.displayName;
    email = props.user.email ? props.user.email : '';
  }

  return (
    <>
      <p>{displayName}</p>
      <p>{email}</p>
    </>
  )
}

export default App;