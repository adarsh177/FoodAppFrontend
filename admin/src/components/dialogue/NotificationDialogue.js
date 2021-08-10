import React from "react";
import "./NotificationDialogue.css";

function NotificationDialogue(props) {
    return (
        <div className="outerContainer">
            <div className="dailogueContainer">
                <p className="title">Notification</p>
                <div className="inputContainer inputContainerNotifi">
                    <lable>Title</lable>
                    <br />
                    <input className="textfield" type="text" />
                </div>
                <div className="inputContainer inputContainerNotifi">
                    <lable>Message</lable>
                    <textarea className="textarea" />
                </div>
                <div className="sendButtonContainer">
                    <button className="sendButton" onClick={props.onSend}>
                        SEND
                    </button>
                </div>
                <div className="sendButtonContainer">
                    <button
                        className="sendButton cancelButton"
                        onClick={props.onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationDialogue;
