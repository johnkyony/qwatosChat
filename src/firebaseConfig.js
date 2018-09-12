import firebase from 'firebase'
import 'firebase/firestore'
const config = {
    apiKey: "AIzaSyBJbWXUkV8kaTCV9cQ99evfimBhohGnNTo",
    authDomain: "qwatoschat-d02bb.firebaseapp.com",
    databaseURL: "https://qwatoschat-d02bb.firebaseio.com",
    projectId: "qwatoschat-d02bb",
    storageBucket: "qwatoschat-d02bb.appspot.com",
    messagingSenderId: "831652407216"
  };
  firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const conversationsCollection = db.collection('conversations') 
const conversationQwatosCollection = db.collection('conversationQwatos')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    conversationsCollection,
    conversationQwatosCollection,
    likesCollection
}