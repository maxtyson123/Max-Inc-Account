import React, {useEffect, useState} from "react";
import {StyledFirebaseAuth} from "react-firebaseui";
import firebase from "firebase/compat/app";
import logo from '../Assets/Images/logo.png'
import '../App.css'
import {useNavigate} from "react-router-dom";


var configUI = {
  signInFlow: 'popup',              //Popup windows
  signInSuccessUrl: "/",            //Where to go once logged in
  signInOptions: [
      //All the providers
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID

  ],
  callbacks: {
      signInSuccessWithAuthResult: async (authResult) => {

          const  userInfo = authResult.additionalUserInfo;
          if(userInfo.isNewUser && userInfo.providerId === 'password'){ //If the user is using username password to sign in
              //Send Email Verification
              try{ 
                  await authResult.user.sendEmailVerification();

                  console.log("Check your email");
              }catch (e) {
                  console.log(e);
              }

          }


          return false;
      }
    }


};



const Signup = () => {
    let navigate = useNavigate();
    useEffect(() => {
        const authObserver = firebase.auth().onAuthStateChanged((user) => { //When the user is logged in or logged out
            setUser(user); //Set wether there is a user or not
        });
        //Before the component is destoryed
        return authObserver; //Delete listnet
    }, [])


    const [user,setUser] = useState(null);

    console.log(user)

    if(user){ //IF there is a user

        if(!user.emailVerified && user.providerData[0].providerId === 'password'){
            return (
                <>
                    <h3>Please verify your email, <small>{user.email}</small></h3>
                    <small>*Make sure to check your spam folder</small>
                    <a onClick={async () => {try{
                        await user.sendEmailVerification();
                        console.log("Check your email");
                    }catch (e) {
                        console.log(e);
                    }}} style={{textDecoration: "underline"}} color={"blue"}  >Resend</a>
                </>
            )

        }else{
            navigate("/")
        }

    }else{ //IF there is not a user show the sign up page
        return(
            <>
                <div className="image-container">
                    <img src={logo} alt="logo" width={"60%"} height={"auto"}/>
                </div>

                <p>Authenticate Max Inc Account</p>
                <StyledFirebaseAuth uiConfig={configUI} firebaseAuth={firebase.auth()} />
            </>

        )
    }


}

export default Signup