import FirebaseUtil from "../Utils/FirebaseUtil";

const FirebaseApp = new FirebaseUtil().app()

async function GetAuthToken(){
    if(FirebaseApp.auth().currentUser)
        return `Bearer ${await FirebaseApp.auth().currentUser.getIdToken()}`;
    else return "Bearer noauth";
}

export default GetAuthToken
