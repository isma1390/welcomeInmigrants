function deletePost() {
    const deletePost = document.getElementById("deletePost")
    deletePost.addEventListener("click", ()=>{
        db.collection("post").doc("DC").delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    })
}