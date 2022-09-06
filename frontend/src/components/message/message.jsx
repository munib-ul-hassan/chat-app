import { useEffect, useState } from "react";
import { getuserbyId, postmessage } from "../../actions/actions";
import { imgUrl } from "../../actions/API";
import "./message.css";
import { format } from "timeago.js"
export default function Message({ message, own }) {
  const [user, setuser] = useState([])
  useEffect(async () => {
    setuser(await getuserbyId(message?.sender));
  }, [])
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={
            `${imgUrl}/1.jpeg`

          }
          className="messageImg"
          alt=""
        />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
}
