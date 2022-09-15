import React, {useEffect} from "react";
import firebase from "firebase/compat/app";
import stupFirebase from "../stupFirebase";
import {useNavigate,useLocation } from "react-router-dom";
import {Button, Avatar} from "@mui/material";
import ResponsiveDrawer from "../Components/SideNavBar";
import BasicTable, {AuthTabel} from "../Components/UserInfoTable";
import Box from "@mui/material/Box";
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import {Launch} from "@mui/icons-material";
import AcccountTable from "../Components/UserInfoTable";
import Typography from "@mui/material/Typography";
import Cookies from 'universal-cookie';
import {RefreshOutlined} from "@mui/icons-material";
import {CheckAuth} from "../Components/AuthConnections";


const cookies = new Cookies();

const Signout = () => {

    firebase.auth().signOut().then(function (){
        console.log("Success sign out")
        window.location.reload();

    }).catch(function () {
        console.log("Error sign out")
        window.location.reload();
    })


}

const Refresh = () => {
    cookies.remove('authData');
    window.location.reload();
}

const DeleteAcc = () => {

    firebase.auth().currentUser.delete().then(function (){
        console.log("Success delete")
        Signout();

    }).catch(function () {
        console.log("Error delete")
        window.location.reload();
    })


}

export var SignedUser = null;
export var Pannel = "/";


function Home() {
    let navigate = useNavigate();
    const location = useLocation();

    console.log("aslkdjasijd",cookies.get('checkData'))


    SignedUser = firebase.auth().currentUser;

    useEffect(() => {
        if(SignedUser === null){
            navigate("/auth", { replace: true })
        }
    }, []);
    useEffect(() => {
        if(cookies.get('appName') != null && SignedUser !== null){
            navigate("/authapp")

        }
    }, []);

    if(cookies.get('appName') != null && SignedUser !== null){

    }else{
        let appid = localStorage.getItem("id");
        if(appid != null){
            if(appid !== undefined){

            }else{
                appid =  Math.floor(100000 + Math.random() * 900000)
            }
        }else{
            appid =  Math.floor(100000 + Math.random() * 900000)
        }
        localStorage.setItem('id', appid);
        CheckAuth("0001",appid);
    }


    Pannel = location.pathname;
    if(SignedUser === null){
            navigate("/auth")
            return (<p>No User</p>)
        }
        else{
            console.log(cookies.get('appName'));



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
                      <MeetingRoomRoundedIcon/>  Sign Out
                    </Button>
                    <br/>
                    <Box
                        display="flex"

                        bgcolor="lightgreen"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <AcccountTable/>
                    </Box>
                    <br/>
                    <Button variant="outlined" color="error" onClick={DeleteAcc}>
                     <PowerSettingsNewRoundedIcon/>   Delete Account
                    </Button>
                </>
            )
        }
        if(Pannel === "/Launcher" || Pannel === "/Authentication"){
            return(
                <>
                    <ResponsiveDrawer/>
                    <Button fullWidth={true} variant="contained" onClick={Signout}>
                        <Launch/>  Download Launcher
                    </Button>
                    <br/>
                    <br/>

                    <Typography variant={"h4"}>
                        Auth Connections
                    </Typography>
                    <Typography>
                        *It can take up to a minute to fully update, if page is empty please reload  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outlined" onClick={Refresh}>
                        <RefreshOutlined/>
                    </Button>
                    </Typography>
                    <br/>
                    <Box
                        display="flex"

                        bgcolor="black"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <AuthTabel/>
                    </Box>
                </>
            )
        }

    }





}

export default Home