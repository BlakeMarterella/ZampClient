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

  let companyOfficalName = document.getElementById('name').value 
  let companyTitle = document.getElementById('alias').value 
  let adminFirstName = document.getElementById('firstName').value 
  let adminLastName = document.getElementById('lastName').value 
  let adminEmail = document.getElementById('email').value
  let tempPass = document.getElementById('password').value
  let image = document.getElementById('image').value 
  var ret = adminEmail.replace('.', '');
  //https://upload.wikimedia.org/wikipedia/commons/3/34/Anser_anser_1_%28Piotr_Kuczynski%29.jpg

firebase.auth().createUserWithEmailAndPassword(adminEmail, tempPass).then((userCredential) => {
        // Signed in           
            var userA = {
              firstName: adminFirstName,
              lastName: adminLastName,
              email: ret
            };
            console.log(ret);
          
        firebase.database().ref(companyOfficalName + "Admin").push(userA).then((snapshot) => {   
          var em = {
            company: companyOfficalName,
            name: adminFirstName
          };
        
          firebase.database().ref("ids").child(ret).set(em).then((snapshot) => {
            let comp = {
              image: image,
              name: companyOfficalName
            }
            firebase.database().ref("Companies").push(comp).then((snapshot) => {
              let profile = {
                alias: companyTitle,
                name: companyOfficalName,
                templateText: ""
              }
            
              firebase.database().ref(companyOfficalName).child("randomID0").set(profile).then((snapshot) => {
                    window.alert("Company created.")
                    window.location.href = "clients.html";
                  });    
            });              
          });
        });
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        return
    });


}



function closeForm(){
    window.location.href = "clients.html";
}