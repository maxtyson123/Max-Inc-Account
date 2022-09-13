import React, {useEffect} from "react";
import firebase from "firebase/compat/app";
import {useNavigate,useLocation } from "react-router-dom";
import {Button, Avatar} from "@mui/material";
import ResponsiveDrawer from "../Components/SideNavBar";
import BasicTable from "../Components/UserInfoTable";
import Box from "@mui/material/Box";
import {doc, setDoc} from "firebase/firestore";

const db = firebase.firestore();
const Signout = () => {

    firebase.auth().signOut().then(function (){
        console.log("Success sign out")

    }).catch(function () {
        console.log("Error sign out")
    })
    window.location.reload();

}

export var SignedUser = null;
export var Pannel = "/";


async function setupUser(){
    const userDocRef = db.collection('users').doc(SignedUser.uid);
    const udoc = await userDocRef.get();
    if (!udoc.exists) {
        try{
            await setDoc(doc(db, "users",SignedUser.uid), {
                name: SignedUser.name,
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

}

function Home() {
    let navigate = useNavigate();
    const location = useLocation();

    SignedUser = firebase.auth().currentUser;

    useEffect(() => {
        if(SignedUser === null){
            navigate("/auth", { replace: true })
        }
    }, []);
    Pannel = location.pathname;
    if(SignedUser === null){
            navigate("/auth")
            return (<p>No User</p>)
        }
        else{
        setupUser();
        if(Pannel == "/Home" || Pannel == "/"){

            return(
                <>
                    <ResponsiveDrawer/>
                    <Avatar
                        alt={SignedUser.displayName}
                        src={SignedUser.photoURL}
                        sx={{ width: 100, height: 100 }}
                    />
                    <p>Welcome, {SignedUser.displayName} </p>


                </>
            )
        }
        if(Pannel == "/Account"){
            return(
                <>
                    <ResponsiveDrawer/>
                    <Avatar
                        alt={SignedUser.displayName}
                        src={SignedUser.photoURL}
                        sx={{ width: 100, height: 100 }}
                    />
                    <br/>
                    <Button variant="contained" onClick={Signout}>
                        Sign Out
                    </Button>
                    <br/>
                    <Box
                        display="flex"

                        bgcolor="lightgreen"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <BasicTable/>
                    </Box>

                </>
            )
        }

    }





}

export default Home