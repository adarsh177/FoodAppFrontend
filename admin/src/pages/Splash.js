import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import Logo from '../assets/logo.png'
import FirebaseUtil from "../Utils/FirebaseUtil";

function Splash(props){
    const FirebaseApp = new FirebaseUtil().app()

    useEffect(() => {
        const listener = FirebaseApp.auth().onAuthStateChanged(user => {
            setTimeout(() => {
                props.history.push(user ? '/stats' : '/login')
            }, 1000);
        })
        
        return listener
    }, [])

    return(
        <MainContainer>
            <CenterImage src={Logo} />
            <h2 style={{textAlign: "center"}}>GOOD FOR LOW PRICE<br/>Admin's Panel</h2>
            <p>Loading...</p>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const CenterImage = styled.img`
    width: 8em;
    height: 8em;
    object-fit: contain;
`;

export default withRouter(Splash);
