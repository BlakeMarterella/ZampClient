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

var compName = localStorage.getItem("comp");
var userName = localStorage.getItem("userName");
var imageURL = localStorage.getItem("imageUrl");
var name = compName
var userName2 = userName
var databaseRefPro = firebase.database().ref(name);
var cost = 0.0

databaseRefPro.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    var childKey = childsnapshot.key;
    var childData = childsnapshot.val();
    const items1 = [{
      id: childKey,
      alias: childData.alias,
      color: childData.color,
      imageurl: childData.imageUrl,
      tempText: childData.templateText,
      compName: childData.companyName,
      userName: userName2
    }];
    loadProfile(items1);
  })
})

var user;

function loadProfile(items) {
  items.forEach(item => {
    document.getElementById('compName').innerText = item.alias
    document.getElementById('companyn').innerText = "- " + item.alias + " -"
    user = item.userName
    document.getElementById('image').src = item.imageurl
    localStorage.setItem("alias", item.alias);

  });
}

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
welcome.append(", " + userName);

function loadCost(items) {
  items.forEach(item => {
      cost = item.cost
  })
}

let databaseRefCost = firebase.database().ref(name)

databaseRefCost.once('value', function(snapshot){

 snapshot.forEach(function (childsnapshot) {
  var childKey = childsnapshot.key;
  var childData = childsnapshot.val();
  const items1 = [{
    id: childKey,
    cost: childData.costOfOrder,
  }];
  loadCost(items1)
 })

})


var numChildren;
var totalCost = "";
var databaseRef = firebase.database().ref(name + "Employees");
databaseRef.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {

    numChildren = snapshot.numChildren();
    document.getElementById('employeeCount').innerText = numChildren;
  })
  var price = parseFloat(cost);

  document.getElementById('totalCost').innerText = '$' + numChildren * Math.round(100*price)/100
})

$("#slideshow > div:gt(0)").hide();

setInterval(function () {
  $('#slideshow > div:first')
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#slideshow');
}, 3000);