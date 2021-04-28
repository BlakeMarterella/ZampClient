firebase.auth().signOut();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    nice();

    // User is signed in.


    var user = firebase.auth().currentUser;

    if(user != null){



    }

  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function checker(items){
  items.forEach( item => {

    var ret = document.getElementById("email_field").value.replace('.','');
    console.log(ret);
    if ( ret == item.id) {
    localStorage.setItem("comp", item.comp); 
     window.location.href = "dashboard.html";
     console.log(item.comp);
    }
  })
}

function resetPassword(){
  window.location.href = "passwordReset.html";
}

function nice(){
var databaseRefPro = firebase.database().ref("ids");


databaseRefPro.once('value',function(snapshot){
    snapshot.forEach(function(childsnapshot) { 
        var childKey = childsnapshot.key;
        var childData = childsnapshot.val();
        const items1 = [
            { id: childKey, comp : childData.company }
        ];
        checker(items1);
    })
})
}

function login(){
  firebase.auth().signOut();

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
}

function logout(){
  firebase.auth().signOut();
}

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    login()
  }
})