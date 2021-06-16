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

function addSwag() {

    let brand = document.getElementById('brand').value
    let title = document.getElementById('title').value
    let price = document.getElementById('price').value
    let image = document.getElementById('image').value
    if (brand != "" && title != "" && price != "" && image != "") {

        const items1 = {
            brand: brand,
            image: image,
            price: price,
            title: title
        };

        firebase.database().ref("Swag").push(items1).then((snapshot) => {
            alert("Everything uploaded successfully!")
            location.reload()
        });
    } else {
        alert("Please enter data in all the feilds.")
    }

}