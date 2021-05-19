class Navbar extends HTMLElement {
    constructor() {
      super();
    }
  
    //  add class="active" to the <li> to add a border to the current page

    connectedCallback() {
      this.innerHTML = `
      <div class="logo">
          <img src="../assets/img/logo.png" alt="..." 
          style="width:50%;
          height:50%; 
          display:block;
          margin-left: auto;
          margin-right: auto;
          width: 50%;">
          <a target="_blank" href="http://www.zampmarketing.com" class="simple-text">
              Zamp Admin
          </a>
      </div>`;
    }
  }
  
  //Toggle CSS from JS
//   popup.classList.toggle("hide");

customElements.define('logo-component', Navbar);