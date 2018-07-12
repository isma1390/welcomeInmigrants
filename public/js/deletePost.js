function deletePost() {
    const deletePost = document.getElementById("deletePost")
    deletePost.addEventListener("click", ()=>{
        db.collection('post').doc('post.id').delete().then(function() {
            console.log("El post ha sido borrado");
        }).catch(function(error) {
            console.error("Error removiendo el documento ", error);
        });
    })
}