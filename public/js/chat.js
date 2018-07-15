/* Se realiza una función que ejecute la función de mensajes directos */
function chatting() {


  /*Estamos buscando el destinatario para poder hacer la ruta entre el que envía el mensaje y quien lo recibe  */
  firebase.database().ref('users')

    .on('child_added', (snapshot) => {
      usersList = Object.entries(snapshot.val());
      console.log("los usuarios > " + JSON.stringify(snapshot.val()));
      console.log(usersList);
    });



  let receiverName = document.getElementById('receiverName')
  receiverName.addEventListener('keypress', () => {
    usersList.forEach((usr) => {
      return receiver = usr.filter(usr2 => usr === receiverName.value);

      console.log(receiver);
    })

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
      console.log("Nuevo mensaje > " + newMessage.val().text + newMessage.val().receiver);
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
  txt.value = "";

  //Para tener una nueva llave en la colección messages
  const newMessageKey = firebase.database().ref().child('messages').push().key;

  firebase.database().ref(`messages/${newMessageKey}`).set({
    creator: currentUser.uid,
    creatorName: currentUser.displayName,
    receiver: receiver,
    text: messageAreaTextChat
  });
}