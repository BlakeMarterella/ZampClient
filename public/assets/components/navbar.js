class Navbar extends HTMLElement {
    constructor() {
      super();
    }
  
    //  add class="active" to the <li> to add a border to the current page

    connectedCallback() {
      this.innerHTML = `
      <div class="sidebar" data-color="blue">      
      <div class="sidebar-wrapper">
      <div class="logo">
          <img src="/assets/img/logo.png" alt="..." 
          style="width:50%;
          height:50%; 
          display:block;
          margin-left: auto;
          margin-right: auto;
          width: 50%;">
          <a target="_blank" href="http://www.zampmarketing.com" class="simple-text">
              Zamp Marketing
          </a>
      </div>    
          <ul class="nav">
              <li>
                  <a href="dashboard.html">
                      <i class="pe-7s-home"></i>
                      <p>Home</p>
                  </a>
              </li>
              <li>
              <a href="swag.html">
                  <i class="pe-7s-plugin"></i>
                  <p>Swag Manager</p>
              </a>
              </li>
              <li>
                  <a href="employees.html">
                      <i class="pe-7s-note2"></i>
                      <p>Employees</p>
                  </a>
              </li>
              <li>
              <a href="company.html">
                  <i class="pe-7s-config"></i>
                  <p>Company Profile</p>
              </a>
              </li>
          </ul>
      </div>
  </div>
  </div>
      `;
    }
  }
  
  //Toggle CSS from JS
//   popup.classList.toggle("hide");

customElements.define('navbar-component', Navbar);