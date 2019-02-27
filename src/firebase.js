import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgu_3wTA7pg6t_JlVmAUexQVKhzaQjBYU",
    authDomain: "postit-c9b80.firebaseapp.com",
    databaseURL: "https://postit-c9b80.firebaseio.com",
    projectId: "postit-c9b80",
    storageBucket: "postit-c9b80.appspot.com",
    messagingSenderId: "842809341567"
};
firebase.initializeApp(config);

export default firebase;

