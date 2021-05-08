import React, { useState } from 'react';
import './App.css';
// import firebase from "firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth';
import { projectAuth } from './firebase/config'
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
import ProgressBar from './components/ProgressBar';
// import useFirestore from "./hooks/useFirestore";


function App() {
  // const { docs } = useFirestore("image-gallery");
  const [selectedImage, setSelectedImage] = useState(null);
  const types = ["image/png", "image/jpeg", "image/PNG"]
  const [error, setError] = useState('');
  const [user] = useAuthState(projectAuth);
  function selectFile(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      console.log('selected');
      setSelectedImage(selectedFile);
      setError("");
    }else{
      console.log("not selected")
      setError("Invalid File Type!");
      setSelectedImage("")
    }

  }

  return (
    <div className="App">
      <header > <img src="jan-uvach.png" alt="header-logo" />

        {projectAuth.currentUser && <div className="img-div">
          <label><input className="img-input" type="file" onChange={selectFile}></input>
            <span>+</span></label>
            {error && <span>❌</span>}
            {selectedImage && <span><ProgressBar selectedImage={selectedImage} setSelectedImage={setSelectedImage}/></span>}
            
          </div>}
       {/* Jan Uvach */}

      
     {projectAuth.currentUser && (
          <button className="sign-out" onClick={() => projectAuth.signOut()}><img src="https://img.icons8.com/dusk/64/000000/login-rounded-right.png" alt="sign-out" /></button>
        )}
      </header>

      <section>
        {
          user ? <ChatRoom>
          </ChatRoom> : <SignIn />
        }
      </section>

    </div>
  );
}


export default App;
