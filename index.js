import express from "express";
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBIfgnGlmxP3iI0IZwZAslZELo_uLQQLf0",
    authDomain: "radiation-display-f5272.firebaseapp.com",
    projectId: "radiation-display-f5272",
    storageBucket: "radiation-display-f5272.appspot.com",
    messagingSenderId: "46965304098",
    appId: "1:46965304098:web:3b530ae87a325937f3937b"
};

const dbApp = initializeApp(firebaseConfig);
const db = getFirestore(dbApp);
const app = express()

let PORT = process.env.PORT || 4000

app.get("/", async (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 
    
    const getData = async () => {
        const docSnap = await getDoc(doc(db, "ScaParameter", "u11HXFCRjpZQ1STD75iy"));
        const data = docSnap.data()
        return data
    }
    
    const data = await getData()
    let deserializeJson = `{\"LLD\":${data["LLD"]},\"window\":${data["window"]},\"time\":${data["time"]},\"id\":\"${data["id"]}\",\"status\":${data["status"]}}`
    console.log(deserializeJson)
    res.send(deserializeJson)
});

app.listen(PORT, () => {
    console.log(`Listen on the port ${PORT}`);
})