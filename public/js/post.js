  // POST USUARIO
  function posting() {
    const sendPost = document.getElementById("sendPost");
    sendPost.addEventListener("click", () => {
    firebase
      .database()
      .ref("post")
      .limitToLast(5)
      .on("child_added", (newPost) => {
        postPrint.innerHTML += `
        <ul class="list-group list-group-flush" style="width: 100%;" id= "${newPost.Key}" >
                  <li class="list-group-item">
                  <h6 class="card-title">${newPost.val().creator}</h6>
                  <p class="card-text text-justify">${newPost.val().text}</p>
                  <i class="fas fa-edit"> | </i> <i class="fas fa-trash-alt" id="deletePost" oneclick="deletePosting (event)" data-post = "${newPost.Key}" ></i> 
                  </li>
                </ul>
            `;
      });  
    });
  };


  function sendPosting() {
    const currentUser = firebase.auth().currentUser;
    const postAreaText = postArea.value;
    //Para tener una nueva llave en la colección Posts
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
        creatorName: currentUser.email,
        text: postAreaText
      });
  }

  //borrar post
    function deletePosting (event) {
      event.stopPopagation();
      const postId = event.target.getAttribute("data-post");
      const postRef = firebase.database().ref("post").child(postId);
      postRef.remove();
      postPrint.removeChild(postPrint.childNodes[0] && postPrint.childNodes[1]);
    }
/*
//borrar post

const deletePost = document.getElementById("deletePost")
deletePost.addEventListener('click',() => {
  e.stopPropagation();
  const idPost = e.target.getAttribute("data-idPost")
  const postRef = firebase.database().ref('post/' + idPost);
  postRef.remove();

 });

*/
