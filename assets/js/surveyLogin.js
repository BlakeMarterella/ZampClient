//where the email gets filtered

function checker(items){
  items.forEach( item => {

    var ret = document.getElementById("email_field").value.replace('.','');
    console.log(ret);
    if ( ret == item.id) {
        console.log(item.comp);
        localStorage.setItem("compSurvey", item.comp); 
        console.log( localStorage.getItem("compSurvey"));
     window.location.href = "survey.html";
     console.log(item.comp);
    }
  })
}
function nice() {
  var databaseRefPro = firebase.database().ref("Employees");


      databaseRefPro.once('value',function(snapshot){
        snapshot.forEach(function(childsnapshot) { 
             var childKey = childsnapshot.key;
          var childData = childsnapshot.val();
             const items1 = [
                 { id: childKey, comp : childData.company }
             ];
           checker(items1);
       })
      })
}


function login(){
    nice()
}

function logout(){
  firebase.auth().signOut();
}

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    login()
  }
})