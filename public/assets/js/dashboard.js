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

  var compName = localStorage.getItem("comp");
  var name = compName
  var databaseRefPro = firebase.database().ref(name);

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


function loadProfile(items) {
    console.log(name);
    
    items.forEach( item => {
    document.getElementById('compName').innerText = item.alias
    localStorage.setItem("alias", item.alias); 

    });
}

var numChildren;
var totalCost = "";
var databaseRef = firebase.database().ref(name + "Employees");
databaseRef.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    
      console.log(snapshot.numChildren()); 
      numChildren = snapshot.numChildren();
      totalCost = "$63.21";
      document.getElementById('employeeCount').innerText = numChildren;
      document.getElementById('totalCost').innerText = totalCost;

      if(numChildren < 100) {
        document.getElementById("employeeCount").style.fontSize = "10vw";
      } else if(numChildren < 1000) {
        document.getElementById("employeeCount").style.fontSize = "09vw";
      } else if(numChildren < 10000) {
        document.getElementById("employeeCount").style.fontSize = "07vw";
      } else {
        document.getElementById("employeeCount").style.fontSize = "05vw";
      }
      
      if(totalCost.length < 7) {
        document.getElementById("totalCost").style.fontSize = "08vw";
      } else if(totalCost.length < 9) {
        document.getElementById("totalCost").style.fontSize = "06vw";
      } else if(totalCost.length < 10) {
        document.getElementById("totalCost").style.fontSize = "05vw";
      } else {
        document.getElementById("totalCost").style.fontSize = "04vw";
      }
  })
})

$("#slideshow > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#slideshow');
}, 3000);