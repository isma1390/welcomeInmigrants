// opcionalmente modifico el scope
provider.addScope('user_friends');



// // evento para el botón de login con facebook
// document.getElementById('firebaseui-auth-container').addEventListener('click', function () {
//   // autentico con Facebook
//   authService.signInWithPopup(provider)
//     .then(function (result) {
//       //todo correcto
//       console.log('autenticado usuario ', result.user);
//     })
//     .catch(function (error) {
//       console.log('Detectado un error:', error);
//     });
// })