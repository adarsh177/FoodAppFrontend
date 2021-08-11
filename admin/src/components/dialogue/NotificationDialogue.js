import React, { useState } from "react";
import { SendNotification } from "../../APIs/AdminManager";
import "./NotificationDialogue.css";

function NotificationDialogue(props) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const SendNotificationClicked = (ev) => {
    ev.preventDefault();
    if (title.length == 0) {
      alert("Please enter notification title");
      return;
    }
    if (message.length == 0) {
      alert("Please enter notification message");
      return;
    }

    const data = {
      title: title,
      message: message,
    };
    // if fcmToken is set
    if (props.fcmToken) {
      data["fcmToken"] = props.fcmToken;
    } else data["topic"] = props.topic;

    SendNotification(data)
      .then(() => {
        alert("Notification Send Successfully");
        resetFields();
        props.onClose();
      })
      .catch((err) => {
        alert(`Error sending notification at the moment.\n${err}`);
      });
  };

  const resetFields = () => {
    setTitle("");
    setMessage("");
  };

  return (
    <div className="outerContainer">
      <div className="dailogueContainer">
        <p className="title">Notification</p>
        <div className="inputContainer inputContainerNotifi">
          <lable>Title</lable>
          <br />
          <input
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className="textfield"
            type="text"
          />
        </div>
        <div className="inputContainer inputContainerNotifi">
          <lable>Message</lable>
          <textarea
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            className="textarea"
          />
        </div>
        <div className="sendButtonContainer">
          <button className="sendButton" onClick={SendNotificationClicked}>
            SEND
          </button>
        </div>
        <div className="sendButtonContainer">
          <button
            className="sendButton cancelButton"
            onClick={() => {
              resetFields();
              props.onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationDialogue;
