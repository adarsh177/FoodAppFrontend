import Firebase from 'firebase/app';

class FirebaseUtil{
    constructor(){
        if(Firebase.apps.length < 1){
            Firebase.initializeApp({
                apiKey: "AIzaSyCtTNVQQEBokGYrer3kDZWxQ66f1pXySKA",
                authDomain: "good-for-low-price.firebaseapp.com",
                projectId: "good-for-low-price",
                storageBucket: "good-for-low-price.appspot.com",
                messagingSenderId: "781117811423",
                appId: "1:781117811423:web:7cf584d23efd296bbc976a",
                measurementId: "G-0K1MH3B8CE"
              });
        }
    }

    app(){
        return Firebase.app();
    }
}

export default FirebaseUtil;