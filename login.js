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

// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       requireDisplayName: false
//     },
//     {
//       provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       scopes: [
//         'https://www.googleapis.com/auth/userinfo.email'
//       ],
//     }
//   ]
// })

// var uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function (authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return false;
//     },
//     uiShown: function () {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     },
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: 'https://crystalwu1.github.io/cusail-links/',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   ],
//   // Terms of service url.
//   tosUrl: 'https://crystalwu1.github.io/cusail-links/',
//   // Privacy policy url.
//   privacyPolicyUrl: 'https://crystalwu1.github.io/cusail-links/'
// };

// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// // The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);

// firebase.auth().onAuthStateChanged(function (user) {
//   window.user = user; // user is undefined if no user signed in
//   if (user) {
//     alert(user.email)
//     console.log(user)
//   } else {
//     alert("wrong")
//     var provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope("https://www.googleapis.com/auth/userinfo.email");
//     firebase.auth().signInWithRedirect(provider);
//   }
// });

// firebase.auth().getRedirectResult().then(function (result) {
//   if (result.credential) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // ...
//   }
//   // The signed-in user info.
//   var user = result.user;
// }).catch(function (error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");

  firebase.auth().signInWithPopup(provider)
    .then(() => {
      window.location.assign("index.html")
    })
    .catch(error => {
      console.error(error)
    })
}