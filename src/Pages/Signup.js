import React, {useEffect, useState} from "react";
import {StyledFirebaseAuth} from "react-firebaseui";
import firebase from "firebase/compat/app";
import logo from '../Assets/Images/logo.png'
import '../App.css'
import {useNavigate, useSearchParams} from "react-router-dom";
import stupFirebase from "../stupFirebase";
import {doc, setDoc} from "firebase/firestore";



const db = firebase.firestore();

var configUI = {
  signInFlow: 'popup',              //Popup windows
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

          console.log("setting up user")

          const userDocRef = db.collection('users').doc(userInfo.profile.email);
          const udoc = await userDocRef.get();

          if (!udoc.exists) {
              try{
                  await setDoc(doc(db, "users",userInfo.profile.email), {
                      name: userInfo.profile.name,
                      games_owned: [],

                  });

                  console.log("Made User");
              }catch (e) {
                  console.log(e);
              }
              console.log('No such document exist!');
          } else {
              console.log('Document exist!');

          }

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
    const [searchParams, setSearchParams] = useSearchParams();
    let auth = searchParams.get("authapp")
    useEffect(() => {
        const authObserver = firebase.auth().onAuthStateChanged((user) => { //When the user is logged in or logged out
            setUser(user); //Set wether there is a user or not
        });
        //Before the component is destoryed
        return authObserver; //Delete listnet
    }, [])


    const [user,setUser] = useState(null);


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
            console.log("auth",auth);
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