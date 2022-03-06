import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase";
import { Navbar } from "./navbar/NavBar";
import { NotesList } from "./notes/NoteList";
import { NoteEditor } from "./notes/NoteEditor";

function App() {
  const [user] = useAuthState(auth);
  
  let notesUI;
  if (user) {
    notesUI = (
      <>
        <NotesList user={user}/>
        <NoteEditor user={user}/>
      </>
    );
  }

  return (
    <>
      <Navbar user={user} />
      {notesUI}
    </>
  );
}

export default App;