import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase";
import { Navbar } from "./navbar/NavBar";
import { NotesView } from './notes/NotesView';

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar user={user} />
      {user && <NotesView user={user} />}
    </>
  );
}

export default App;