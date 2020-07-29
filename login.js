// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBm87XbFNx1qbyXw9eBvgovbVXBD5osCpQ",
  authDomain: "cusail-omnibox-a6705.firebaseapp.com",
  databaseURL: "https://cusail-omnibox-a6705.firebaseio.com",
  projectId: "cusail-omnibox-a6705",
  storageBucket: "cusail-omnibox-a6705.appspot.com",
  messagingSenderId: "782612915461",
  appId: "1:782612915461:web:5df3976372f0736f2f436c",
  measurementId: "G-DLH92W1HM0"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");

  firebase.auth().signInWithPopup(provider)
    .then(() => {
      window.location.assign("index.html")
      //display all
      filterSelection('all')
    })
    .catch(error => {
      window.location.assign("login.html")
      console.error(error)
    })
}

function signOut() {
  firebase.auth().signOut()
  window.location.assign("login.html")
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.assign("index.html");
    console.log("signed in", user);

    var ref = db.collection("users").doc(user.id);
    ref.get().then(function (doc) {

      if (doc.exists) {
        console.log("Document data:", doc.data());

      } else {
        db.collection('users').doc(user.id).set({
          id: user.id,
          member: false
        })
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  } else {
    console.log("signed out");

    // window.location.assign("login.html")
  }
})