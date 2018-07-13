// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Editar post
var postEditRef = db.collection("post").doc();

// Set the "capital" field of the city 'DC'
return postEditRef.update({
  text: messageAreaText
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});