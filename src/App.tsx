import { FC, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app, auth } from "./firebase";
import { User } from "firebase/auth";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { Navbar } from "./NavBar";

function App() {
  const [user] = useAuthState(auth);

  // if (user) {
  //   return (
  //     <>
  //       <SignOut />
  //       <UserInfo user={user}/>
  //       <NotesList user={user}/>
  //       <NoteEditor user={user}/>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <SignIn />
  //     </>
  //   );
  // }

  return (
    <>
      <Navbar user={user} />
    </>
  );
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

export default App;