import React from "react";
import "./NotificationDialogue.css";

function NotificationDialogue() {
    return (
        <div className="outerContainer">
            <div className="dailogueContainer">
                <p className="title">Notification</p>
                <div className="inputContainer inputContainerNotifi">
                    <lable>Title</lable><br />
                    <input className="textfield" type="text" />
                </div>
                <div className="inputContainer inputContainerNotifi">
                    <lable>Title</lable>
                    <textarea className="textarea" />
                </div>
                <div className="sendButtonContainer">
                    <button className="sendButton">SEND</button>
                </div>
            </div>
        </div>
    );
}

export default NotificationDialogue;
