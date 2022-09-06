import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/conversations";
import Message from "../../components/message/message";
import Chatonline from "../../components/chatOnline/Chatonline"
import "./messenger.css";
import { getconversation, getmesseges, getuserbyId, postmessage } from "../../actions/actions";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client"
export default function Messenger() {
  const { user } = useContext(AuthContext)
  const [conversationlist, setconversationlist] = useState([]);
  const [currentchat, setCurrentchat] = useState(null);
  const socket = useRef()

  const [messages, setmessages] = useState([])
  const [arrivalMessage,setarrivalMessage] = useState(null)
useEffect(()=>{
  socket.current =io("ws://localhost:8000")
  socket.current.on("getMessage",(data)=>{
    console.log(data);
    setarrivalMessage({
sender:data.senderId,
text:data.text,
createdAt:Date.now(), 
    })})
},[])
useEffect(()=>{
  console.log(arrivalMessage);
  arrivalMessage && currentchat.members.includes(arrivalMessage.sender) && setmessages(prev =>[...prev, arrivalMessage])
  console.log(messages);
},[arrivalMessage,currentchat])
  
  useEffect(async () => {
    setconversationlist(await getconversation(user._id));
  }, []);
useEffect(()=>{
  socket.current.emit("addUser",user._id)
  socket.current.on("getusers",users=>console.log(users))
},[user])

  useEffect(async () => { 
    setmessages(await getmesseges(currentchat?._id))
  }, [currentchat])
  const [text, settxt] = useState("")

  const handlesend = async () => {
    postmessage(currentchat?._id, user._id, text)
    const receiverId = currentchat.members.find(member=>member != user._id)
console.log( {recieverId:receiverId,senderId: user._id, text:text});
    socket.current.emit("sendMessage", {recieverId:receiverId,senderId: user._id, text:text})
    settxt("")
    setmessages(await getmesseges(currentchat?._id))
  }


  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuwrapper">
            <input
              placeholder="Search for friends"
              className="chatMenuInput"
            ></input>
            {conversationlist.map((item) => {
              return (


                <div onClick={() => { setCurrentchat(item) }}>

                  <Conversation state={item} currentuser={user} />
                </div>
              )

            })}

          </div>
        </div>
        <div className="chatBox">
          {currentchat ? <>
            <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                {messages?.map((s) => {
                  return (
                    <Message message={s} own={s.sender == user._id} />

                  )
                })}




              </div>

              <div className="chatBoxBottom">
                <textarea className="chatMessageInput" value={text} onChange={(e) => { settxt(e.target.value) }} placeholder="Message"></textarea>
                <button className="chatSubmitButton" onClick={() => { handlesend() }}>Send</button>
              </div>
            </div>
          </> : <span className="chatText">Open chat for conversation</span>}
        </div>
        <div className="chatOnline">
          <div className="chatOnlinewrapper">
            <Chatonline />
          </div>
        </div>
      </div>
    </>
  );
}
