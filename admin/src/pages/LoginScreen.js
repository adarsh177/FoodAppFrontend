import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import FirebaseUtil from "../Utils/FirebaseUtil";
import Logo from "../assets/logo.png";
import { withRouter } from "react-router-dom";
import { CheckAdmin } from "../APIs/AdminManager";

function LoginScreen(props) {
  const FirebaseApp = new FirebaseUtil().app();
  const [showUI, setShowUI] = useState(true);

  var firebaseui = require("firebaseui");
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (auth, redirect) => {
        console.log("Auth", auth);
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token) => {
            console.log("Id Token: ", token);
          })
          .catch((err) => {
            console.log("Id Token(err): ", err);
          });
        setShowUI(true);
      },
      signInFailure: (err) => {
        alert("Error Signing you in");
        console.error("Signin error", err);
        setShowUI(true);
      },
      uiShown: () => {
        setShowUI(false);
      },
    },
    signInFlow: "popup",
    signInSuccessUrl: false,
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
      },
    ],
  };

  useEffect(() => {
    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance();
      ui.start("#FirebasePreBuildUIHolder", uiConfig);
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#FirebasePreBuildUIHolder", uiConfig);
    }

    const listener = firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        CheckAdmin()
          .then(() => {
            props.history.push("/stats");
          })
          .catch((err) => {
            alert("Admin account not found: " + err);
            window.location.reload();
          });
      }
    });

    return listener;
  }, []);

  return (
    <MainContainer>
      <Dialog>
        <LogoImage src={Logo} />
        <h2>Good For Low Price</h2>
        <h6 style={{ textAlign: "center", color: "gray" }}>Admin Section</h6>
        <br></br>
        <FirebaseUIContainer id="FirebasePreBuildUIHolder" />
      </Dialog>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #03045e;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAV0lEQVR4AWPg5uaexcDI8B9Ec3JyFhDCpKpnACmGYWI0kKqe9j4AAi0gBtPEaCBZPYggF1NsAYXBR9gCShPAwPuAkgRA30imJR4tKkaLitGiYrSoIAIDAKy7LKCTTHSAAAAAAElFTkSuQmCC);
  background-repeat: repeat;
`;

const Dialog = styled.div`
  width: calc(100% - 40px);
  max-width: 400px;
  height: 90%;
  max-height: 600px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const MailboxImageStyle = styled.img`
  width: 30%;
  object-fit: contain;
  margin: 20px;
`;

const FirebaseUIContainer = styled.div`
  width: 100%;
  flex: 1;
`;

export default withRouter(LoginScreen);
