//Load Config stuff for Firebase
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
var comapanyName = "CompanyA" //created a var to manipuate from PHP or somshit like that
var messagesRef = firebase.database().ref(comapanyName + 'survey');
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
    var newMessageRef = messagesRef.push(); //pushes the data from the parameters into firebase
    newMessageRef.set({
        firstName: firstName,
        lastName: lastName,
        company: company,
        streetAddress: streetAddress,
        swagType : swag
    });
}