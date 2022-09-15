import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Avatar, Button, createTheme, ThemeProvider} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import firebase from "firebase/compat/app";
import Cookies from 'universal-cookie';
import {addApp} from "../Components/AuthConnections";


const darkTheme = createTheme({ palette: { mode: 'dark' } });
const cookies = new Cookies();

const Accpet = async (info) => {
    Reject();
    await addApp(info)

}

const Reject = () => {

    cookies.remove('appName');
    cookies.remove('appData');

}


export default function () {

    let navigate = useNavigate();



    const [searchParams, setSearchParams] = useSearchParams();
    let appName = searchParams.get("appname")
    let appData = searchParams.get("appdata");
    if(appName != null){
        cookies.set('appName', appName, { path: '/' });
    }else{
        if(cookies.get('appName') == null){
            navigate("/");
        }
        appName = cookies.get('appName');
    }

    if(appData != null){
        cookies.set('appData', appData, { path: '/' });
    }else{
        if(cookies.get('appData') == null){
            navigate("/");
        }
        if(cookies.get('appData') != undefined){
            appData = (cookies.get('appData'));
            console.log(appData)
            appData = (atob(cookies.get('appData')));
            console.log(appData)
            appData = JSON.parse(atob(cookies.get('appData')));
            console.log(appData)
        }

    }

    useEffect(() => {

        if(firebase.auth().currentUser === null){
            navigate("/auth?authapp=true", { replace: true })
        }
    }, []);

    return(
        <>
            <ThemeProvider theme={darkTheme}>
                    <Typography variant={"h2"}>
                        {appName}
                    </Typography>
                <br/>
                <Avatar
                        alt={appName}
                        src={"../Assets/"+{appName}+".png"}
                        sx={{ width: 100, height: 100 }}
                    />
                    <br/>
                    <br/>
                    <Typography maxWidth={"50%"}>
                        {appName} is trying to connect to your Max Inc account, do you wish to allow it to?
                    </Typography>
                <br/>
                <div>
                    <Button onClick={Reject} variant="outlined" color="error">
                        No
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={() => {
                        Accpet(appData);
                        navigate("/Launcher")

                    }}  variant="contained" color="success">
                        Yes
                    </Button>

                </div>


            </ThemeProvider>
        </>
    )
}