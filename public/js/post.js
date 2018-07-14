
function posting() {
  function toggleMenu() {
    // añadir función onclick="toggleMenu()" al botón del nav bar y al botón cerrar.
    if (sideMenu.className.indexOf("menu_closed") >= 0) {
      // primero revisamos si la clase d-none esta
      openMenu(); // si esta la clase quiere decir que el menú esta cerrado, asi que llamamos la funcion para abrirlo
    } else {
      closeMenu(); //si no esta la clase, le indicamos que cierre el menu
    }
  }

  function openMenu() {
    sideMenu.classList.remove("menu_closed"); // quitando clase display-none
    sideMenu.classList.add("menu_open");
  }

  function closeMenu() {
    sideMenu.classList.add("menu_closed"); // añadimos la clase display-none
    sideMenu.classList.remove("menu_open");
  }

  // POST USUARIO
  const sendPost = document.getElementById("sendPost");
  sendPost.addEventListener("click", () => {
    firebase
      .database()
      .ref("post")
      .limitToLast(5)
      .on("child_added", newMessage => {
        postPrint.innerHTML += `
        <ul class="list-group list-group-flush" style="width: 100%;" id= "${newMessage.Key}" >
                  <li class="list-group-item">
                  <h6 class="card-title">${newMessage.val().creator}</h6>
                  <p class="card-text text-justify">${newMessage.val().text}</p>
                  <i class="fas fa-edit"> | </i> <i id="DeletePost" class="fas fa-trash-alt" data-idPost = "${newMessage.Key}" > | </i> 
                  </li>
                </ul>
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
}

//función para borrar post
function deletePost() {
const deletePost = document.getElementById("deletePost")
deletePost.addEventListener('click',(p) => {
  p.stopPropagation();
  const idPost = p.target.getAttribute("data-idPost")
  const postRef = dbRef.child('post/' + idPost);
  postRef.remove()
 })
};

