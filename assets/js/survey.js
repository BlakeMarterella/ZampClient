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
var compName = localStorage.getItem("compSurvey"); 
var comapanyName = compName


//creates an event listen for when the submit button is pressed, and calls the funtion submitForm

document.getElementById('post').addEventListener('submit', submitForm); //<-- the submitForm is called when the listener is activated

function submitForm(e) {
    e.preventDefault();

    //get values from the id tags
    var firstName = getInputVal('first_name');
    var lastName = getInputVal('last_name');
    var company = getInputVal('company');
    var address = getInputVal('street_adr');
    
    var swagChecked = document.querySelector('input[name = "swag"]:checked');

    if(swagChecked != null){  //Test if something was checked
        var swag = swagChecked.value
        saveSurvey(firstName, lastName, company,address,swag); //sends the data over in the pram

} else {
        alert('Select the sawg bitch'); //Alert, nothing was checked.
    }

     
}
//function to get form vaules

function getInputVal(id) {
    return document.getElementById(id).value; 
}

//save survey elemets from form
function saveSurvey(firstName, lastName, company, streetAddress,swag) {
    console.log(comapanyName)
    var messagesRef = firebase.database().ref(comapanyName + 'survey');
    var newMessageRef = messagesRef.push(); //pushes the data from the parameters into firebase
    newMessageRef.set({
        firstName: firstName,
        lastName: lastName,
        company: company,
        streetAddress: streetAddress,
        swagType : swag
    });
}

function loadProfile(items) {
    
    items.forEach( item => {
      document.getElementById('description').innerHTML = item.tempText;
      document.getElementById('epic').innerText = "you got some swag by " + item.alias + "!"

    });
}

var databaseRefPro = firebase.database().ref(comapanyName);

databaseRefPro.once('value',function(snapshot){
    snapshot.forEach(function(childsnapshot) { 
        var childKey = childsnapshot.key;
        var childData = childsnapshot.val();
        const items1 = [
            { id: childKey, alias: childData.alias, color: childData.color , imageurl: childData.imageUrl, tempText : childData.templateText, compName: childData.companyName}
        ];
        loadProfile(items1);
    })
})