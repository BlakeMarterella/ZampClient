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

document.getElementById('compName').innerText = localStorage.getItem("alias");

var databaseRefPro = firebase.database().ref("Swag");


databaseRefPro.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    var childKey = childsnapshot.key;
    var childData = childsnapshot.val();
    const items1 = [{
      id: childKey,
      Name: childData.brand,
      image: childData.image,
      price: childData.price,
      title: childData.title
    }];
    loadItems(items1);
  })
})
// var arr = [
//     { "Name": "Peter", "Job": "Programmer" },
//     { "Name": "John", "Job": "Programmer" },
//     { "Name": "Kevin", "Job": "Scientist" },
// ];
var ids = [];
var counter = 0

function loadItems(item) {
  $.each(item, function (i) {
    var templateString = 
    '<div class="col-md-4"><div class="content"><div class="card mb-2 box-shadow"><img class="card-img" src=' + item[i].image + ' alt="Card image cap"><div class="card-body"><h5 class="card-title" id="nice">' + item[i].Name + '</h5> <label class="card-description" id="cool">' + item[i].id + '</label <br> </p>  <button id="press"  class="btn btn-info btn-fill card-button" onclick="getID(' + counter + ')">Add Product</button> </div></div></div></div>';
    $('#cards').append(templateString);
    const dic = {
      index: counter,
      id: item[i].id
    };
    ids.push(dic)
    counter++;
  })
}

function getID(num) {
  console.log(num);
  console.log(ids);
  var i = 0
  ids.forEach(item => {
    if (item.index == num) {
      window.alert("item " + item.id)
      return;
    }
    i++;
  });
  document.getElementById("selected").innerHTML("bruh");
}

//If the array is empty and there arent any products, hide the pricing info card
if(ids.length < 1) {
  // document.getElementById("pricing").style.display = "none";
  document.getElementById("pricing").style.display = "block";
}
else {
  document.getElementById("pricing").style.display = "block";
}