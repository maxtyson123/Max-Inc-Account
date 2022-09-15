import firebase from "firebase/compat/app";
import {SignedUser} from "../Pages/Home";
import stupFirebase from "../stupFirebase";
import {doc, updateDoc, getDoc, arrayRemove, arrayUnion} from "firebase/firestore";
import publicIp from "react-public-ip";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {authinfo} from "./UserInfoTable";
import {useEffect} from "react";

//stuct: app-appid-ip
//Web Portal: 0000
//Launcher  : 0001
//Sunnyland : 0002




const db = firebase.firestore();
export async function addApp(info) {
    const userdoc = doc(db, "users", SignedUser.email);
    const ipv4 = await publicIp.v4()
    info.ip = ipv4;
    await updateDoc(userdoc, {
        Auths: arrayUnion(info)
    });


}

export async function removeApp(info) {
    const userdoc = doc(db, "users", SignedUser.email);

    await updateDoc(userdoc, {
        Auths: arrayRemove(info)
    });


}

const cookies = new Cookies();



export async function GetAuth() {
    let navigate = useNavigate();
    var authdata = cookies.get('authData');
    if(authdata != null){
        if(authdata !== undefined){
            return;
        }
    }
    console.log("download")
    const d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));


    const docRef = doc(db, "users", SignedUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
       const data = docSnap.data();
       const auths = data.Auths;
       cookies.set("authData", auths, { path: '/', expirationTime: d.getTime() });
        navigate("/Launcher")
    } else {
        return "Error";
    }


}

const exampleAppInfo = {
    "appId" : "0001",
    "appCode" : "234112",
    "ip" : "192.168.3.1",
}

export async function CheckAuth(appId,appCode,navpage="none") {

    let navigate  = useNavigate();
    var authdata = cookies.get('checkData');
    if(authdata != null){
        if(authdata !== undefined){
            CheckData(appId,appCode,authdata);
            return;
        }
    }
    console.log("download")
    const d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));


    const docRef = doc(db, "users", SignedUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const auths = data.Auths;
        cookies.set("checkData", auths, { path: '/', expirationTime: d.getTime() });
        CheckData(appId,appCode,cookies.get('checkData'));
        alert("Server")
    } else {
        alert("Server Error")
    }


}

function CheckData(appid,appCode,data){
    let ignore = false;
    for(let x = 0; x < data.length; x++){
        if(data[x].appId == appid){
            console.log("appids", appid+":"+data[x].appId)
            if(data[x].appCode == appCode){
                ignore = true;

            }
        }

    }
    let navinfo = "appname="+authinfo[appid]+"&appdata="+btoa('{"appId":"'+appid+'","appCode":"'+appCode+'","ip":"192.168.3.1"}')+"&authed=yes";
    let navigate  = useNavigate();
    useEffect(() => {

        if(!ignore)
            navigate("/authapp?"+navinfo)
    }, []);


}
