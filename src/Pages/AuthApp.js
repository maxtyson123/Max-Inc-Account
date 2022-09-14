import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Avatar, Button, createTheme, ThemeProvider} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import firebase from "firebase/compat/app";
import Cookies from 'universal-cookie';


const darkTheme = createTheme({ palette: { mode: 'dark' } });
const cookies = new Cookies();

const Reject = () => {

    cookies.remove('appName');
    window.location.reload();
}

export default function () {

    let navigate = useNavigate();



    const [searchParams, setSearchParams] = useSearchParams();
    let appName = searchParams.get("appname")
    if(appName != null){
        cookies.set('appName', appName, { path: '/' });
        console.log(cookies.get('appName'));
    }else{
        if(cookies.get('appName') == null){
            navigate("/");
        }
        appName = cookies.get('appName');
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
                    <Button  variant="contained" color="success">
                        Yes
                    </Button>

                </div>


            </ThemeProvider>
        </>
    )
}