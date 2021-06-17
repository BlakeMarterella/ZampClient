firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
  
      if (user != null) {
  
      }
  
    } else {
      // No user is signed in.
      window.location.href = "index.html";
    }
  });

var welcome = document.getElementById('welcome-msg');
welcome.innerHTML = "Welcome";  
var curTime = new Date().getHours();
if (curTime > 0 && curTime < 12) {
   welcome.innerHTML = "Good Morning";  
} else if (curTime < 16) {
  welcome.innerHTML = "Good Afternoon";  
} else {
  welcome.innerHTML = "Good Evening";  
}
welcome.append(", Jill!");