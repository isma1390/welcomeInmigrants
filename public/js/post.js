// POST USUARIO
function posting() {
  // POST INICIO
  sendPost.addEventListener("click", () => {
    const currentUser = firebase.auth().currentUser;
    const postAreaText = postArea.value;
    postArea.value = " ";
    //Para tener una nueva llave en la colección messages
    let newPostKey = firebase
      .database()
      .ref()
      .child("post")
      .push().key;

    firebase
      .database()
      .ref(`post/${newPostKey}`)
      .set({
        creator: currentUser.displayName,
        creatorEmail: currentUser.email,
        text: postAreaText,
      });
  });
};
//Imprimir Post
const drawPosts = (posts) => {
  postPrint.innerHTML = '';
  Object.entries(posts.val()).forEach((post) => {
    postPrint.innerHTML += `
            <ul class="list-group list-group-flush" style="width: 100%;"> 
              <li class="list-group-item">
              <h6 class="card-title">${post[1].creator}</h6>
              <p class="card-text text-justify">${post[1].text}</p>
              <i class="fas fa-edit" data-text="${post[1].text}" onclick="updatePost("eventUpdate") id="editPost"> </i> <i class="fas fa-trash-alt" data-post="${post[0]}" onclick="deletePost(event)"></i> 
              </li>
            </ul>
        `;
  });
}
//Borrar Post
function deletePost(event) {
  event.stopPropagation(); //se activa solamente donde se hace click
  const postId = event.target.getAttribute("data-post");
  firebase.database().ref("/post").child(postId).remove()
    .then(function () {
      console.log('El documento ha sido borrado');
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error('Error al editar el borrado', error);
    });
}

// Editar post
function updatePost(eventUpdate) {
  /*
  document.getElementById("postArea").value = postAreaText;
  const btnEdit = document.getElementById("sendPost");
  btnEdit.innerHTML = "EDITAR";
  btnEdit.onclick = function () {
    const postText = eventUpdate.target.getAttribute('data-text');
    let postAreaText = document.getElementById("postArea").value
    return firebase.database().ref("/post").child(postText).update({
      text: postAreaText
    }).then(function () {
      console.log('El documento ha sido editado');
      btnEdit.innerHTML = "SEND";
    })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error al editar el documento', error);
      });
  }*/
};

/*
//contador
let contador = 0;
mundoLike.onclick = function() {
  printLike.innerHTML= contador++;
}
*/