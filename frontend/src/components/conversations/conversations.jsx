import React, { useEffect, useState } from "react";
import "./conversations.css";
import { getconversation, getuserbyId } from "../../actions/actions";
const { imgUrl } = require("../../actions/API")

export default function Conversation({state,currentuser}) {
  
  const [user,setuser] = useState([])
  useEffect(async ()=>{
    const friendId = state.members.find(F => F !== currentuser._id)
          setuser(await getuserbyId(friendId ));

  },[])

  // const [conversationlist, setconversationlist] = useState([]);
  // const [senderlist, setsenderlist] = useState([]);
  // useEffect(async () => {
  //   setconversationlist(await getconversation());
  //   conversationlist.map(async (item) => {
  //     item.members.map(async (v) => {
  //       if (v != JSON.parse(localStorage.getItem("user"))._id) {
  //         const value = [...senderlist]
  //         value.push(await getuserbyId(v))
  //         setsenderlist(value)
  //       }
  //     })
  //   });
  // }, []);
  
  return (
    //   {
    //     senderlist.map((item)=>{

    //         return(
    // <div className="conversation">
    //         <img
    //               src={`http://192.168.0.44:8800/images/person/${item.profilePricture}`}

    //           alt=""
    //           className="conversationimg"
    //         />
    //          <sapn className="conversationName"> {item.username}</sapn>
    //       </div>)
    //     })
    //   }
    
    
        <div className="conversation" onClick={() => {
          localStorage.getItem("conversationId",state._id)
          
        }}>
          <img
            src={
              `${imgUrl}/${user.profilePicture}`
            }
            alt=""
            className="conversationimg"
          />
          <span className="conversationName"> {user.username}</span>
        </div>)
    

  
}
