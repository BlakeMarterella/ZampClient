
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      if(user != null){
             
      }
  
    } else {
      // No user is signed in.
      window.location.href = "index.html";
    }
  });
  
  document.getElementById('compName').innerText = localStorage.getItem("alias");

var arr = [
    { "Name": "Peter", "Job": "Programmer" },
    { "Name": "John", "Job": "Programmer" },
    { "Name": "Kevin", "Job": "Scientist" },
];

$.each(arr, function (i) {
    var templateString = '<div class="col-md-4"><div class="card mb-2 box-shadow"><img class="card-img-top" src="http://safarset.com/wp-content/uploads/2019/05/IMG-20190423-WA0029.jpeg" alt="Card image cap"><div class="card-body"><h5>' + arr[i].Name + '</h5></p></div></div></div>';
    $('#cards').append(templateString);
})