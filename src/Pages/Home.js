import React, {useEffect} from "react";
import firebase from "firebase/compat/app";
import {useNavigate } from "react-router-dom";

const Signout = () => {

    firebase.auth().signOut().then(function (){
        console.log("Success sign out")

    }).catch(function () {
        console.log("Error sign out")
    })
    window.location.reload();

}



function Home() {
    let navigate = useNavigate();
    const user = firebase.auth().currentUser;

    useEffect(() => {
        if(user === null){
            navigate("/auth", { replace: true })
        }
    }, []);

    if(user === null){
            navigate("/auth")
            return (<p>No User</p>)
        }

        else
            return(
                <>
                    <p>Welcome, {user.displayName} </p>
                    <small>{user.email}</small>
                    <br/>
                    <button onClick={Signout}>Sign Out</button>
                </>
            )




}

export default Home