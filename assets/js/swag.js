
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

  var databaseRefPro = firebase.database().ref("Swag");


  databaseRefPro.once('value',function(snapshot){
    snapshot.forEach(function(childsnapshot) { 
         var childKey = childsnapshot.key;
      var childData = childsnapshot.val();
         const items1 = [
             { id: childKey, Name : childData.brand, image : childData.image, price : childData.price, title : childData.title }
         ];
       loadItems(items1);
   })
  })
// var arr = [
//     { "Name": "Peter", "Job": "Programmer" },
//     { "Name": "John", "Job": "Programmer" },
//     { "Name": "Kevin", "Job": "Scientist" },
// ];

function loadItems(item) {
  $.each(item, function (i) {
    var templateString = '<div class="col-md-4"><div class="card mb-2 box-shadow"><img class="card-img-top" src=' + item[i].image + ' alt="Card image cap"><div class="card-body"><h5 id="nice">' + item[i].Name + '</h5> <h5 id="cool">' + item[i].id + '</h5 <br> </p><button id="presses" onclick="getID()">test</button></div></div></div>';
    $('#cards').append(templateString);
})
}

function getID(){
console.log("lkjn");
}


