  // POST USUARIO
function posting() {
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
          text: postAreaText
        });  
  });
}
  // Borrar post
function deletePost(event) {
  event.stopPropagation(); //se activa solamente donde se hace click
  const postId = event.target.getAttribute("data-post");
  const postRef = firebase.database().ref("post").child(postId);
  postRef.remove()
  .then(function() {
    console.log("El documento ha sido borrado");
  })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error al borrar el documento ", error);
  });
}

// Editar post
function updatePost(eventUpdate) {
  const postText = eventUpdate.target.getAttribute("data-post");
  const TextRef = firebase.database().ref("post").child(postText);
  TextRef.update()  
    .then(function() {
      console.log("El documento ha sido editado");
    })
    .catch(function(error) {
    // The document probably doesn't exist.
      console.error("Error al editar el documento ", error);
    });
}

const drawPosts = (posts) => {
  console.log(posts);
  Object.entries(posts.val()).forEach((post) => { 
    postPrint.innerHTML += `
            <ul class="list-group list-group-flush" style="width: 100%;"> 
              <li class="list-group-item">
              <h6 class="card-title">${post[1].creator}</h6>
              <p class="card-text text-justify">${post[1].text}</p>
              <i class="fas fa-edit" data-text="${post[1].text}" onclick="updatePost("eventUpdate") id="editPost"> </i> <i class="fas fa-trash-alt" data-post="${post[0].Key}" onclick="deletePost(event)"></i> 
              </li>
            </ul>
        `;
  });
}
