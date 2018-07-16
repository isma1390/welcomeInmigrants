/* Se realiza una función que ejecute la función de mensajes directos */
function chatting() {


  /*Estamos buscando el destinatario para poder hacer la ruta entre el que envía el mensaje y quien lo recibe  */
  firebase.database().ref('users')

    .on('value', (snapshot) => {
      usersList = snapshot.val();
      // console.log("los usuarios > " + JSON.stringify(snapshot.val()));
      console.log(usersList);
    });



  let receiverName = document.getElementById('receiverName');
  receiverName.addEventListener('keypress', () => {
    receiver = Object.values(usersList).filter((user) => {
      return user.displayName.toUpperCase().indexOf(receiverName.value.toUpperCase()) >= 0;
    });
    console.log(receiver);

  });


  console.log("Setting up chat listener...");
  firebase.database().ref('messages')
    .limitToLast(2) // Filtro para no obtener todos los mensajes
    .once('value')
    .then((messages) => {
      console.log("Mensajes > " + JSON.stringify(messages));
    })
    .catch(() => {

    });

  //Acá comenzamos a escuchar por nuevos mensajes usando el evento
  //on child_added
  firebase.database().ref('messages')
    .limitToLast(1)
    .on('child_added', (newMessage) => {
      console.log("Nuevo mensaje > " + newMessage.val().text + JSON.stringify(newMessage.val().receiver));
      messageContainer.innerHTML += `
                <p>Nombre : ${newMessage.val().creatorName}</p>
                <p>${newMessage.val().text}</p>
            `;
    });
};




// Usaremos una colección para guardar los mensajes, llamada messages
function sendMessage() {
  const currentUser = firebase.auth().currentUser;
  const messageAreaTextChat = txt.value;
  txt.value = '';
  console.log(currentUser);

  //Para tener una nueva llave en la colección messages
  const newMessageKey = firebase.database().ref().child('messages').push().key;

  firebase.database().ref(`messages/${newMessageKey}`).set({
    creator: currentUser.uid,
    creatorName: currentUser.displayName,
    receiver: receiver,
    text: messageAreaTextChat
  });
}

let createChat = (uid1, uid2) => {
  if (uid1 > uid2) {
    return uid1 + uid2;
  } else {
    return uid2 + uid1;
  }

}

let privateChat = (uid, name, picture) => {
  if (chatRef) {
    chatRef.off();
  }
  const chatRef = firebase.database().ref('chats/') + createChat(uid, firebase.auth().currentUser.uid + '/messages');
  chatRef.on('value', sendMessage);
  document.getElementById('contactsChat').innerHTML = `<img src="${picture}" height="32" width="32">${name}`;

}

const showContacts = (snapshot) => {
  let contactsByOrder = '<ul>';
  Object.values(snapshot.val()).forEach((user) => {
    contactsByOrder += `<li><img src="${user.photoUrl}" height="16" width="16"> <a href="#" onclick="privateChat('${user.uid}', '${user.name}', '${user.photoUrl}')">${user.name} </a></li>`
  })
  document.getElementById('listContacts').innerHTML = contactsByOrder + "</ul>";
}