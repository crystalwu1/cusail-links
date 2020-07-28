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
    console.log("signed in", user)
    window.location.assign("index.html")
  } else {
  }
})