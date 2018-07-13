// POST USUARIO
window.onload = () => {
  function toggleMenu() { // añadir función onclick="toggleMenu()" al botón del nav bar y al botón cerrar.
    if (sideMenu.className.indexOf("menu_closed") >= 0) { // primero revisamos si la clase d-none esta
      openMenu();  // si esta la clase quiere decir que el menú esta cerrado, asi que llamamos la funcion para abrirlo
    } else {
      closeMenu(); //si no esta la clase, le indicamos que cierre el menu
    }
  }

  function openMenu() {
    sideMenu.classList.remove('menu_closed'); // quitando clase display-none
    sideMenu.classList.add('menu_open');
  }

  function closeMenu() {
    sideMenu.classList.add('menu_closed'); // añadimos la clase display-none
    sideMenu.classList.remove('menu_open');
  }

  sendPost.addEventListener('click', () => {
  firebase.database().ref('post')
  .limitToLast(5)
  .on('child_added', (newMessage) => {
    postPrint.innerHTML += `
                <p> Usuario : ${newMessage.val().creatorName}</p>
                <p>${newMessage.val().text}</p>
            `;
  });

    const currentUser = firebase.auth().currentUser;
    const messageAreaText = messageArea.value;
    //Para tener una nueva llave en la colección messages
    let newMessageKey = firebase.database().ref().child('post').push().key;
    
    firebase.database().ref(`post/${newMessageKey}`).set({
      creator: currentUser.displayName,
      creatorName: currentUser.email,
      text: messageAreaText
    });
})
}