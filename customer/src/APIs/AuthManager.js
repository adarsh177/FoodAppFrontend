import auth from '@react-native-firebase/auth';

async function GetAuthToken(){
    if(auth().currentUser)
        return `Bearer ${await auth().currentUser.getIdToken()}`;
    else return "Bearer noauth";
}

export default GetAuthToken
