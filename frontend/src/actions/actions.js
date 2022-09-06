import { LocalFlorist } from "@material-ui/icons";
import axios from "axios";


const {baseUrl,imgUrl} = require("./API")
export async function getconversation(id) {

    const res = await axios.get(`${baseUrl}/api/conversation/${id}`, {})

    return res.data.data
}

export async function getuserbyId(id) {
    const res = await axios.get(`${baseUrl}/api/auth/getuserbyId/${id}`)
    
    return res.data
}
export async function postmessage(conversationId, sender, text) {
    await axios.post(`${baseUrl}/api/message`,{conversationId, sender, text})
    
}
export async function getconversationd(id){
   const res =  await axios.get(`${baseUrl}/api/auth/message/${id}`)
    return res.data.data
}

export async function getmesseges(conversationId){
console.log(conversationId);
    

    const res = await axios.get(`${baseUrl}/api/message/${conversationId}`)

    return res.data.data
}