import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {SignedUser} from "../Pages/Home";
import {Avatar, Button} from "@mui/material";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import {GetAuth, removeApp} from "./AuthConnections";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";




export default function AcccountTable(type) {

    function createData(name, data) {
        return { name, data };
    }

    var rows = [
        createData('Name', SignedUser.displayName),
        createData('Email', SignedUser.email),
        createData('Email Verified', "True"),
        createData('Stored Profile Picture', <a href={SignedUser.photoURL}>Link</a> ),
        createData('Last Signed In Time', SignedUser.metadata.lastSignInTime),
        createData('Account Creation Time', SignedUser.metadata.creationTime),



    ];

    for(let x = 0; x < SignedUser.providerData.length; x++){
        rows.push(createData('Login Type ['+x+"]", SignedUser.providerData[x].providerId));
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Account Detail</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.data}</TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function deleteAuth(){

};

export const authinfo = {
    "0000":"Test",
    "0001":"Max Inc Web Portal",
}

const imgInfo = {
    "0000":"https://i.imgur.com/gHnPOBT.png",        //Max Inc Logo
    "0001":"https://i.imgur.com/gHnPOBT.png",        //Max Inc Logo
}

const cookies = new Cookies();

export function AuthTabel(type) {

    let navigate = useNavigate();
    function createData(providername, authIp, authId, pos,image) {
        return { providername, authIp,authId,pos, image };
    }

    var rows = [
    ];
    GetAuth();
    var authdata = cookies.get('authData');
    if(authdata != null){
        if(authdata !== undefined){
            console.log("authdata",authdata);
            for(let x = 0; x < authdata.length; x++){
                rows.push(createData(authinfo[authdata[x].appId], authdata[x].ip, authdata[x].appCode,x,imgInfo[authdata[x].appId]));
            }

        }

    }




    return (
        <TableContainer component={Paper}  >
            <Table sx={{color: 'red', minWidth: 650}}  aria-label="simple table">
                <TableHead style={{background: "lightblue"}}>
                    <TableRow sx={{color: "red"}}>
                        <TableCell>Provider</TableCell>
                        <TableCell >Icon</TableCell>
                        <TableCell align="right">IP</TableCell>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Remove</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody style={{background: "lightcyan"}}>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.providername}
                            </TableCell>
                            <TableCell align="right"> <Avatar
                                alt={row.providername}

                                src={row.image}
                                sx={{ width: 50, height: 50 }}
                            /></TableCell>
                            <TableCell align="right">{row.authIp} </TableCell>
                            <TableCell align="right">{row.authId} </TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" color="error" onClick={() =>{
                                    let i = row.pos;
                                    let x = row.providername;
                                    console.log(i);
                                    removeApp(authdata[i]);
                                    cookies.remove('authData');
                                    if(x === "Max Inc Web Portal")
                                     cookies.remove('checkData');
                                    navigate("/Launcher")

                                }}>
                                    Remove
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
