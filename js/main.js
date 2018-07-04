//función de CDN
var config = {
  apiKey: "AIzaSyAgX6hSSO9TqHkhLJzFmBLLczE8GuMCsoo",
  authDomain: "welcome-inmigrants.firebaseapp.com",
  databaseURL: "https://welcome-inmigrants.firebaseio.com",
  projectId: "welcome-inmigrants",
  storageBucket: "welcome-inmigrants.appspot.com",
  messagingSenderId: "517706659234"
};
firebase.initializeApp(config);

//  Initialize Firebase
var config = {
  apiKey: "AIzaSyAgX6hSSO9TqHkhLJzFmBLLczE8GuMCsoo",
  authDomain: "welcome-inmigrants.firebaseapp.com",
  databaseURL: "https://welcome-inmigrants.firebaseio.com",
  projectId: "welcome-inmigrants",
  storageBucket: "welcome-inmigrants.appspot.com",
  messagingSenderId: "517706659234"
};
firebase.initializeApp(config);

//Autenticación

document.addEventListener('DOMContentLoaded', function () {
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  //
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  try {
    let app = firebase.app();
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [ // Leave the lines as is for the providers you want to offer
        firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ], // Terms of service
      tosUrl: '/terms-of-service'
    };
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        document.getElementById("firebaseui-auth-container").innerHTML = "Hola " + user.displayName;
      } else {
        document.getElementById("firebaseui-auth-container").innerHTML = "";
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    });
  } catch (e) {
    console.error(e);
  }
});

//Logout cerrar sesión
const logoutBtn = document.getElementById("logoutBtn")
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    logoutBtn.addEventListener("click", function () {
      firebase.auth().signOut().then(function() {
        //El usuario ahora ya tiene la sesión cerrada, vamos a la página de log-in
    })
    .catch(function(error) {
        //Hubo un error mientras se cerraba la sesión
    });
    });
  } else {
    document.getElementById("firebaseui-auth-container").innerHTML = "";
        ui.start('#firebaseui-auth-container', uiConfig);
  }
});
