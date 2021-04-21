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
