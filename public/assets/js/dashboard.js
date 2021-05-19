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


function loadProfile(items) {
  console.log(name);

  items.forEach(item => {
    document.getElementById('compName').innerText = item.alias
    document.getElementById('companyn').innerText = "- " + item.alias + " -"
    document.getElementById('welcome').innerText = "Welcome, " + item.userName
    document.getElementById('image').src = item.imageurl
    localStorage.setItem("alias", item.alias);

  });
}

function loadCost(items) {
  items.forEach(item => {


    document.getElementById('totalCost').innerText = item.cost
    if (totalCost.length < 7) {
      document.getElementById("totalCost").style.fontSize = "08vw";
    } else if (totalCost.length < 9) {
      document.getElementById("totalCost").style.fontSize = "06vw";
    } else if (totalCost.length < 10) {
      document.getElementById("totalCost").style.fontSize = "05vw";
    } else {
      document.getElementById("totalCost").style.fontSize = "04vw";
    }
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

    console.log(snapshot.numChildren());
    numChildren = snapshot.numChildren();
    document.getElementById('employeeCount').innerText = numChildren;

    if (numChildren < 100) {
      document.getElementById("employeeCount").style.fontSize = "10vw";
    } else if (numChildren < 1000) {
      document.getElementById("employeeCount").style.fontSize = "09vw";
    } else if (numChildren < 10000) {
      document.getElementById("employeeCount").style.fontSize = "07vw";
    } else {
      document.getElementById("employeeCount").style.fontSize = "05vw";
    }
  })
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