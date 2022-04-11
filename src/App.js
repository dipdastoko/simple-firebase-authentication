import './App.css';
import initializeAuthentication from './Firebase/Firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

initializeAuthentication();
const provider = new GoogleAuthProvider();

function App() {
  const handleButtonClick = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
  }
  return (
    <div className="App">
      <button onClick={handleButtonClick}>Sign In With Google</button>
    </div>
  );
}

export default App;
