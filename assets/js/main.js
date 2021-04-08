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

const loginButton = document.getElementById('submit')
const email = document.getElementById('email')
const password = document.getElementById('password')

document.getElementById('nice').addEventListener('submit', submitForm);

function login(){

}

loginButton.addEventListener('submit',e => {

	const email = this.email.value;
	const password = this.password.value;

	const promise = auth.signinWithEmailAndPassword(email,password);
	promise.catch(e => console.log(e.message));
}) 

firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		console.log(firebaseUser);
	}
	else {
		console.log("No dide");
	}
})


$(function() {
	'use strict';

	
  $('.form-control').on('input', function() {
	  var $field = $(this).closest('.form-group');
	  if (this.value) {
	    $field.addClass('field--not-empty');
	  } else {
	    $field.removeClass('field--not-empty');
	  }
	});

});