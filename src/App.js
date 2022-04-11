import './App.css';
import initializeAuthentication from './Firebase/Firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();
const auth = getAuth();
function App() {
  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const logedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(logedInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitProvider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        console.log(result.user);
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
  }
  return (
    <div className="App">
      {!user.name ? <div>
        <button onClick={handleGoogleSignIn}>Sign In With Google</button>
        <button onClick={handleGithubSignIn}>Sign In With Github</button>
      </div> :
        <button onClick={handleSignOut}>Sign Out</button>}
      {

        user && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
