import firebase from "firebase/compat/app";
import {SignedUser} from "../Pages/Home";
import stupFirebase from "../stupFirebase";
import {doc, updateDoc, getDoc, arrayRemove, arrayUnion} from "firebase/firestore";
import publicIp from "react-public-ip";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

//stuct: app-appid-ip
//Web Portal: 0000
//Launcher  : 0001
//Sunnyland : 0002

const exampleAppInfo = {
    "appId" : "0001",
    "appCode" : "234112",
    "ip" : "192.168.3.1",
}


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

