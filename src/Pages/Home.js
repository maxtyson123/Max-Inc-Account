import React, {useEffect} from "react";
import firebase from "firebase/compat/app";
import stupFirebase from "../stupFirebase";
import {useNavigate,useLocation } from "react-router-dom";
import {Button, Avatar} from "@mui/material";
import ResponsiveDrawer from "../Components/SideNavBar";
import BasicTable from "../Components/UserInfoTable";
import Box from "@mui/material/Box";
import {doc, setDoc} from "firebase/firestore";

const Signout = () => {

    firebase.auth().signOut().then(function (){
        console.log("Success sign out")

    }).catch(function () {
        console.log("Error sign out")
    })
    window.location.reload();

}

const DeleteAcc = () => {

    firebase.auth().currentUser.delete().then(function (){
        console.log("Success delete")

    }).catch(function () {
        console.log("Error delete")
    })
    window.location.reload();

}

export var SignedUser = null;
export var Pannel = "/";


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

        if(Pannel === "/Home" || Pannel === "/"){

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
        if(Pannel === "/Account"){
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
                    <br/>
                    <Button variant="outlined" color="error" onClick={DeleteAcc}>
                        Delete Account
                    </Button>
                </>
            )
        }

    }





}

export default Home