import './App.css';
import initializeAuthentication from './Firebase/Firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';

initializeAuthentication();
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});

  const handleButtonClick = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
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
  return (
    <div className="App">
      <button onClick={handleButtonClick}>Sign In With Google</button>
      {
        user.email && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
