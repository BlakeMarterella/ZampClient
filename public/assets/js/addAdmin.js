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




function addEmployee() {
    let firstName = document.getElementById('firstname').value
    let lastName = document.getElementById('lastname').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    if (firstName != "" && lastName != "" && email != "" && password != "") {
        var userA = {
            firstName: firstName,
            lastName: lastName,
            email: email
        };

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                firebase.database().ref(this.name + "Admin").push(userA).then((snapshot) => {
                    var ret = email.replace('.', '');
                    var em = {
                        company: name,
                        name: firstName
                    };
                    firebase.database().ref("ids").child(ret).set(em).then((snapshot) => {
                        this.console.log("Created");
                        window.location.href = "company.html";
                    });
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });

    } else {
        window.alert("Please fill out the required data.")
    }
}


function closeForm() {
    window.location.href = "company.html";
}