import React from 'react'
import {projectAuth} from '../firebase/config';
import firebase from 'firebase/app'
var SignIn = () =>{

    const signInWithGoogle = ()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        projectAuth.signInWithPopup(provider);

    }

    return (
        <div>
            <button className="sign-in" onClick={signInWithGoogle}> <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" alt="google-sig-in"/> Sign in with Google </button>
            
        </div>
    )
}




export default SignIn;
// export default SignOut;
