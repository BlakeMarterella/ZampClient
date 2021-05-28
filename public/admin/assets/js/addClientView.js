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
//Makes a ref to the company survey, concatanates the company name + survey to find easily0
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


function add(){
    
}



function closeForm(){
    window.location.href = "clients.html";
}