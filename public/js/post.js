// POST USUARIO
function posting() {
  btnValidar.addEventListener("click", () => {
    if (InputEmail.value == "" || InputPassword.value == "") {
      alert("Debe introducir su correo electronico o contraseña");
    } else if (InputPassword.value.length < 8) {
      alert("Por favor introduzca solo 8 digitos numericos");
    }
    post.style.display = "block";
    login.style.display = "none";
  });

  // POST INICIO

  sendPost.addEventListener("click", () => {
    firebase
      .database()
      .ref("post")
      .limitToLast(5)
      .on("child_added", newMessage => {
        postPrint.innerHTML += `
                <p> Usuario : ${newMessage.val().creatorName}</p>
                <p>${newMessage.val().text}</p>
            `;
      });

    const currentUser = firebase.auth().currentUser;
    const messageAreaText = messageArea.value;
    //Para tener una nueva llave en la colección messages
    let newMessageKey = firebase
      .database()
      .ref()
      .child("post")
      .push().key;

    firebase
      .database()
      .ref(`post/${newMessageKey}`)
      .set({
        creator: currentUser.displayName,
        creatorName: currentUser.email,
        text: messageAreaText
      });
  });

  let contador = 0;

  mundoLike.onclick = function() {
    printLike.innerHTML= contador++;
  };
}
 




