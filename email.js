firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    let user = userCredential.user;
    // ...
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    // ..
  });