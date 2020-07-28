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
      console.log(user)
    })
    .catch(error => {
      window.location.assign("login.html")
      console.error(error)
    })
}

function signOut() {
  firebase.auth().signOut().then(function () {
    window.location.assign("login.html")
  }).catch(function (error) {
    window.location.assign("login.html")
  });
}