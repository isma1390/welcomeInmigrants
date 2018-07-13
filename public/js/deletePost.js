// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function deletePost() {

    const deletePost = document.getElementById("deletePost")
    deletePost.addEventListener("click", ()=>{
        db.collection('post').doc('').delete().then(function() {
            console.log("El post ha sido borrado");
        }).catch(function(error) {
            console.error("Error removiendo el documento ", error);
        });
    })
}

/*deletePost.addEventListener('click',() => {
    conectKey = newMessageKey;
    let postDelete = firebase.database().ref('post');
   
    postDelete.on('child_remove',(newMessage) =>{
    firebase.database().ref('post' + conectKey).remove();
    console.log(newMessage.val().displayName + "Ha borrado el post")
   })
    
   });*/