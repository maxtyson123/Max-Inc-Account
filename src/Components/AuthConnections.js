import firebase from "firebase/compat/app";
import {SignedUser} from "../Pages/Home";
import stupFirebase from "../stupFirebase";
import {doc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore";
import publicIp from "react-public-ip";

//stuct: app-appid-ip
//Web Portal: 0000
//Launcher  : 0001
//Sunnyland : 0002

const db = firebase.firestore(app,appid);
export async function addApp() {
    const washingtonRef = doc(db, "user", SignedUser.email);

// Atomically add a new region to the "regions" array field.
    const ipv4 = await publicIp.v4()
    await updateDoc(washingtonRef, {
        Auths: arrayUnion(app+"-"+appid+"-"+ipv4)
    });


}