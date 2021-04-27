//Load Config stuff for Firebase, main part of the survey
var firebaseConfig = {
    apiKey: "AIzaSyCl7crXlHPqniJeASl4T1KJEuItdRpv64E",
    authDomain: "projecto-ae74c.firebaseapp.com",
    databaseURL: "https://projecto-ae74c-default-rtdb.firebaseio.com",
    projectId: "projecto-ae74c",
    storageBucket: "projecto-ae74c.appspot.com",
    messagingSenderId: "319216252694",
    appId: "1:319216252694:web:98ab696c38c532d78e4237",
    measurementId: "G-3YYJK8B644"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics(); //Maybe add that? idk 
//Makes a ref to the company survey, concatanates the company name + survey to find easily. 
var compName = localStorage.getItem("comp");
var name = compName



function resetPassword(){
    var auth = firebase.auth();
    var emailAddress = document.getElementById("email").value
    
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
      alert('The email has been sent');
      location.href = 'index.html';
    }).catch(function(error) {
      // An error happened.
      window.alert("Hmm.. it seems that your email isn't vaild. Check to make sure that its correct.")
    });
}

function closeForm() {
    window.location.href = "index.html";
}